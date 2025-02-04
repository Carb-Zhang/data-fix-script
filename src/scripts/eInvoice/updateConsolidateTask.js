import TransactionRecord from '../../models/transactionRecord.js';
import EInvoiceRequestRecord from '../../models/eInvoiceRequestRecord.js';
import EInvoiceConsolidationTask from '../../models/eInvoiceConsolidationTask.js';

const business = 'superkitchen';
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
        docId: '2N15DRF3QBDZ9SXPJXA9F8EJ10',
        documentLongId: 'A0PRTNJQMF8Z1VBENXA9F8EJ10Ztfnbn1733303774',
    },
    {
        docId: 'AMWYHGPSB55ZE2DV56T4F8EJ10',
        documentLongId: 'FV09MA1XW157Y1QM76T4F8EJ10FDYzMN1733303625',
    },
    {
        docId: 'FY2X8B4PEG6D1ZWB86T4F8EJ10',
        documentLongId: 'VHR7VYGDJGS9E1GEB6T4F8EJ107z4ged1733303625',
    },
    {
        docId: 'H28WWMAA0G7E1S0KQ4G9F8EJ10',
        documentLongId: '2NSPGFFH1M3ZCYQ9R4G9F8EJ10eYWfjk1733303779',
    },
    {
        docId: 'Q56QBYQEZVSGTZMJ7259F8EJ10',
        documentLongId: 'C2JK5WPDHX05FFFP9259F8EJ10uK9E1P1733303768',
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
