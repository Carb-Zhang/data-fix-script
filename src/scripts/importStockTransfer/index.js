import fs from 'fs';
import { promisify } from 'util';
import csv from 'csv';
import StockTransfer from '../../models/stockTransfer.js';
import {
    productHelper,
    i18n,
    awsS3Helper,
    kueHelper,
    stockTransferHelper,
    serialNumberHelper,
} from './helper.js';
const jobs = kueHelper.createQueue();
import _ from 'lodash';
import { sleep } from '../../utils/tools.js';

const { StockTransferStatus } = stockTransferHelper;

async function parseImportStockTransferRow(row, business, sourceStoreId) {
    const identifier = row['Product Id'] || row['SKU'];
    const orderedQty = parseFloat(row['Ordered Qty']);
    const rawSerialNumbers = row['Serial Numbers'] ? row['Serial Numbers'].split(';') : null;

    if (!identifier) {
        throw new Error('StockManagement.Valid SKU or Product Id entry is required');
    }
    if ((!orderedQty || isNaN(orderedQty)) && !rawSerialNumbers) {
        throw new Error(
            "StockManagement.The 'Ordered Qty' entry is required note only numerical values allowed",
        );
    }
    const products = await promisify(productHelper.getProductByIdOrSKU)(business, identifier);
    const product = products[0];
    if (!product) {
        throw new Error('StockManagement.SKU or Product Id is incorrect');
    }
    if (!product.trackInventory) {
        throw new Error(
            'StockManagement.Products must be trackable to be imported successfully To track products in Backoffice check track stock level in Products>Edit Product',
        );
    }

    const productId = product._id.toString();
    if (!product.isSerialized) {
        return {
            productId,
            quantity: orderedQty,
            isSerialized: false,
            serialNumbers: [],
        };
    }

    // check serial numbers
    if (!rawSerialNumbers) {
        throw new Error('No serial numbers detected.');
    }

    const serialNumbers = Array.from(new Set(rawSerialNumbers));
    const existSerialNums = await serialNumberHelper.getSerialNumbersByFilter(business, {
        storeId: sourceStoreId,
        productSerialNums: serialNumbers.map((serialNumber) => ({
            productId,
            serialNum: serialNumber,
        })),
    });
    const nonExistSerialNumbers = _.difference(serialNumbers, _.map(existSerialNums, 'serialNum'));
    if (nonExistSerialNumbers.length > 0) {
        throw new Error(
            `The serial number(s) ${nonExistSerialNumbers.join(
                ';',
            )} not found. Please ensure the correct serial number(s) provided.`,
        );
    }

    return {
        productId,
        quantity: serialNumbers.length,
        isSerialized: true,
        serialNumbers,
    };
}

function parseImportStockTransferCsv(
    business,
    sourceStoreId,
    locale,
    inputFilePath,
    outputStream,
    callback,
) {
    const editedOrderedItems = [];
    let isCsvValid = true;

    csv()
        .from(fs.createReadStream(inputFilePath), {
            columns: true,
            trim: true,
            skip_empty_lines: true,
            comment: '#',
        })
        .to(outputStream, { header: false, newColumns: true, end: true, eof: true })
        .transform(
            (row, _, transformCallback) => {
                parseImportStockTransferRow(row, business, sourceStoreId)
                    .then((editedOrderedItem) => {
                        editedOrderedItems.push(editedOrderedItem);
                        transformCallback(null);
                    })
                    .catch((err) => {
                        isCsvValid = false;
                        console.log('ParseOneRow Error', err);
                        row['Error'] = (err.message || '').startsWith('StockManagement')
                            ? i18n.__({
                                  phrase: err.message,
                                  locale,
                              })
                            : err.message;
                        transformCallback(null, row);
                    });
            },
            { parallel: 1 },
        )
        .on('end', () => {
            callback(null, { editedOrderedItems, isCsvValid });
        })
        .on('error', function (err) {
            outputStream.end();
            callback(err);
        });
}

async function processImportStockTransferJob(jobData) {
    const { business, stockTransferId, locale, file: rawFilePath } = jobData;
    const LOCAL_OUTPUT_FOLDER = 'src/scripts/importStockTransfer/output/';
    const REMOTE_OUTPUT_FOLDER = '/stocktransfers/import/results/';

    console.log(
        `Start importing stock Transfer, business ${business}, stockTransferId: ${stockTransferId}, file: ${rawFilePath}`,
    );

    // check stock transfer
    const stockTransfer = await StockTransfer.findById(stockTransferId);
    if (!stockTransfer) {
        throw new Error('Stock transfer not exists');
    }
    if (stockTransfer.status !== StockTransferStatus.CREATED) {
        throw new Error(`Cannot edit current stock transfer, status: ${stockTransfer.status}`);
    }

    // create output file
    const fileName = rawFilePath.split('/').pop();
    const outputFilePath = LOCAL_OUTPUT_FOLDER + fileName;
    const outputStream = fs.createWriteStream(outputFilePath);
    const headers = ['Product Name', 'SKU', 'Product Id', 'Ordered Qty', 'Serial Numbers', 'Error'];
    outputStream.write(headers.join(',') + '\n');

    // parse raw file
    await promisify(awsS3Helper.downloadFile)(rawFilePath);
    const { editedOrderedItems, isCsvValid } = await promisify(parseImportStockTransferCsv)(
        business,
        stockTransfer.sourceStoreId,
        locale,
        rawFilePath,
        outputStream,
    );
    fs.unlinkSync(rawFilePath);
    outputStream.end();

    if (!isCsvValid) {
        // upload and return output file
        await promisify(awsS3Helper.uploadFile)(outputFilePath, outputFilePath);
        fs.unlinkSync(outputFilePath);
        return REMOTE_OUTPUT_FOLDER + fileName;
    }

    // save changes in db
    fs.unlinkSync(outputFilePath);
    const editedProductIds = editedOrderedItems.map(({ productId }) => productId);
    stockTransfer.orderedItems = stockTransfer.orderedItems.filter(
        ({ productId }) => !editedProductIds.includes(productId),
    );
    stockTransfer.orderedItems.push(...editedOrderedItems);
    await stockTransfer.save();
    return '';
}

jobs.process('Import stocktransfers', (job, done) => {
    processImportStockTransferJob(job.data)
        .then((outputFilePath) => {
            done(null, outputFilePath);
        })
        .catch((err) => {
            console.log('Handle Import stocktransfers Error', err);
            done(err);
        });
});

export async function run() {
    fs.copyFileSync(
        'src/scripts/importStockTransfer/raw/1.csv',
        'src/scripts/importStockTransfer/raw/1 copy.csv',
    );
    const importJob = jobs.create('Import stocktransfers', {
        business: 'onlytestaccount',
        stockTransferId: '66d597d89338005f1409805c',
        locale: '',
        file: 'src/scripts/importStockTransfer/raw/1 copy.csv',
    });
    importJob.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            importJob
                .on('complete', (res) => console.log('complete', res))
                .on('failed attempt', (res) => console.log('failed attempt', res))
                .on('failed', (res) => console.log('failed', res));
        }
    });
    await sleep(10 * 60 * 1000);
}
