import TransactionRecord from '../../models/transactionRecord.js';
import EInvoiceRequestRecord from '../../models/eInvoiceRequestRecord.js';
import EInvoiceConsolidationTask from '../../models/eInvoiceConsolidationTask.js';

const business = 'nxdistrosdnbhd';
const MONTH = '2025-02';

async function updateTask(receiptNumber) {
    const order = await TransactionRecord.findOne({ business, receiptNumber }).lean();
    const lastConsoledOrder = {
        isOnline: false,
        receiptNumber,
        orderId: order._id.toString(),
        createdTime: order.createdTime,
        transactionType: order.transactionType,
    };

    console.log(lastConsoledOrder);
    await EInvoiceConsolidationTask.default.updateOne(
        { storeId: order.storeId.toString(), month: MONTH },
        { currentRunnerId: null, lastConsoledOrder },
    );
}

export async function updateConsolidateTask() {
    // get all submit doc
    const requestRecords = await EInvoiceRequestRecord.default
        .find({
            business,
            eInvoiceDocumentType: { $in: ['CONSOLIDATE_INVOICE', 'CONSOLIDATE_REFUND'] },
            createdAt: { $gt: new Date(`${MONTH}-01T11:38:11.851+08:00`) },
            'requestResult.eInvoiceStatus': 'SUBMITTED',
        })
        .select({ receiptNumbers: 1 })
        .lean();

    const lastReceiptNumbers = requestRecords.map(({ receiptNumbers }) => {
        return receiptNumbers[receiptNumbers.length - 1];
    });
    console.log(lastReceiptNumbers);
    // update task
    for (const receiptNumber of lastReceiptNumbers) {
        await updateTask(receiptNumber);
    }
}

const documentLongIdsToUpdate = [
    {
        docId: '0B9QMDQMFH3JX1B21X7S71KJ10',
        documentLongId: 'HQF7QPVZRSPFQPHN4X7S71KJ10BS10ts1738429734',
    },
    {
        docId: '6WK4RABGE2P5V1E44F8S71KJ10',
        documentLongId: '7CECFPZJD2PSS60Z6F8S71KJ10BIHRhv1738429735',
    },
    {
        docId: '0J8FZ4V44C1ZNJMN3W7S71KJ10',
        documentLongId: 'A6TA10CJ78J69SD44W7S71KJ100losoL1738429734',
    },
];

export async function finishDataFix() {
    for (const item of documentLongIdsToUpdate) {
        const { docId, documentLongId } = item;
        const requestRecord = await EInvoiceRequestRecord.default
            .findOne({
                'requestResult.documentId': docId,
            })
            .select({ receiptNumbers: 1 })
            .lean();

        const res1 = await TransactionRecord.updateMany(
            { business, receiptNumber: { $in: requestRecord.receiptNumbers } },
            { $set: { 'eInvoiceInfo.eInvoiceStatus': 'VALID' } },
        );
        console.log(res1);

        const res2 = await EInvoiceRequestRecord.default.updateOne(
            {
                'requestResult.documentId': docId,
            },
            {
                $set: {
                    'requestResult.eInvoiceStatus': 'VALID',
                    'requestResult.documentLongId': documentLongId,
                },
            },
        );
        console.log(res2);
    }
}

export async function checkTasks() {
    // get all submit doc
    const requestRecords = await EInvoiceRequestRecord.default
        .find({
            business,
            eInvoiceDocumentType: { $in: ['CONSOLIDATE_INVOICE', 'CONSOLIDATE_REFUND'] },
            createdAt: { $gt: new Date(`${MONTH}-01T11:38:11.851+08:00`) },
            'requestResult.eInvoiceStatus': 'SUBMITTED',
        })
        .select({ receiptNumbers: 1 })
        .lean();

    const lastReceiptNumbers = requestRecords.map(({ receiptNumbers }) => {
        return receiptNumbers[receiptNumbers.length - 1];
    });

    for (const receiptNumber of lastReceiptNumbers) {
        const order = await TransactionRecord.findOne({ business, receiptNumber })
            .select({
                eInvoiceInfo: 1,
            })
            .lean();
        console.log(order);
    }
}
