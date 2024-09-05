import _ from 'lodash';
import fs from 'fs';
import { promisify } from 'util';
import csv from 'csv';
import StockTransfer from '../../models/stockTransfer.js';
import { productHelper, i18n, awsS3Helper, kueHelper } from './helper.js';
const jobs = kueHelper.createQueue();
import { sleep } from '../../utils/tools.js';

async function parseOneRow(row, business) {
    const skuNumber = row['SKU'];
    const productId = row['Product Id'];
    const orderedQty = parseFloat(row['Ordered Qty']);

    if (!skuNumber && !productId) {
        throw new Error('StockManagement.Valid SKU or Product Id entry is required');
    }
    if (!orderedQty || isNaN(orderedQty)) {
        throw new Error(
            "StockManagement.The 'Ordered Qty' entry is required note only numerical values allowed",
        );
    }

    const product = await promisify(productHelper.getProductByIdOrSKU)(
        business,
        skuNumber || productId,
    )[0];
    if (!product) {
        throw new Error('StockManagement.SKU or Product Id is incorrect');
    }
    if (!product.trackInventory) {
        throw new Error(
            'StockManagement.Products must be trackable to be imported successfully To track products in Backoffice check track stock level in Products>Edit Product',
        );
    }

    if (product.isSerialized) {
        throw new Error(
            'StockManagement.This product cannot be added because it is using Serialised inventory type',
        );
    }

    return {
        productId: product._id.toString(),
        quantity: orderedQty,
    };
}

// 1. csv -> csv with error,
// 2. edited orderItems
function parseCSV(business, locale, inputFilePath, outputFilePath, outputStream, callback) {
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
            (row, index, transformCallback) => {
                parseOneRow(row, business)
                    .then((editedOrderedItem) => {
                        editedOrderedItems.push(editedOrderedItem);
                        transformCallback(null);
                    })
                    .catch((err) => {
                        isCsvValid = false;
                        console.log(err);
                        row['Error'] = (err.message || '').startsWith('StockManagement')
                            ? i18n.__({
                                  phrase: 'StockManagement.This product cannot be added because it is using Serialised inventory type',
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
            callback(err, { editedOrderedItems, isCsvValid });
        });
}

async function processImportStockTransferJob(jobData) {
    const { business, stockTransferId, locale, file: rawFilePath } = jobData;
    console.log(
        `Start importing stock Transfer, business ${business}, stockTransferId: ${stockTransferId}, file: ${rawFilePath}`,
    );

    // check stock transfer
    const stockTransfer = await StockTransfer.findById(stockTransferId);

    // download file
    await promisify(awsS3Helper.downloadFile)(rawFilePath);

    // create output file
    const outputFilePath = 'jobResults/stocktransfers/import/' + rawFilePath.split('/').pop();
    const outputStream = fs.createWriteStream(outputFilePath);
    const headers = ['Product Name', 'SKU', 'Product Id', 'Ordered Qty', 'Error'];
    outputStream.write(headers.join(',') + '\n');

    // parse raw file
    const { editedOrderedItems, isCsvValid } = await promisify(parseCSV)(
        business,
        locale,
        rawFilePath,
        outputFilePath,
        outputStream,
    );
    outputStream.end();

    // save changes in db
    if (isCsvValid) {
        const editedProductIds = editedOrderedItems.map(({ productId }) => productId);
        stockTransfer.orderedItems = stockTransfer.orderedItems.filter(
            ({ productId }) => !editedProductIds.includes(productId),
        );
        stockTransfer.orderedItems.push(...editedOrderedItems);
        await stockTransfer.save();
        return '';
    }

    // return output file
    await promisify(awsS3Helper.uploadFile)(outputFilePath, outputFilePath);
    fs.unlinkSync(rawFilePath);
    fs.unlinkSync(outputFilePath);

    return outputFilePath;
}

jobs.process('Import stocktransfers', (job, done) => {
    processImportStockTransferJob(job.data)
        .then((res) => {
            console.log(res);
            done(res);
        })
        .catch((err) => {
            console.log(err);
            done(err);
        });
});

export async function run() {
    const importJob = jobs.create('Import stocktransfers', {
        business: 'onlytestaccount',
        stockTransferId: '66d597d89338005f1409805c',
        locale: '',
        file: '1.csv',
    });
    importJob.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            importJob
                .on('complete', console.log)
                .on('failed attempt', console.log)
                .on('failed', console.log);
        }
    });
    await sleep(10 * 60 * 1000);
}
