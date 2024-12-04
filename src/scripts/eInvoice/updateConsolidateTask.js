import TransactionRecord from '../../models/transactionRecord.js';
import EInvoiceRequestRecord from '../../models/eInvoiceRequestRecord.js';
import EInvoiceConsolidationTask from '../../models/eInvoiceConsolidationTask.js';

const business = 'nxdistrosdnbhd';

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
    // await EInvoiceConsolidationTask.default.updateOne(
    //     { storeId: order.storeId.toString(), month: '2024-12' },
    //     { currentRunnerId: null, lastConsoledOrder },
    // );
}

export async function updateConsolidateTask() {
    // get all submit doc
    const requestRecords = await EInvoiceRequestRecord.default
        .find({
            eInvoiceDocumentType: { $in: ['CONSOLIDATE_INVOICE', 'CONSOLIDATE_REFUND'] },
            createdAt: { $gt: new Date('2024-12-04T11:38:11.851+08:00') },
            'requestResult.eInvoiceStatus': 'SUBMITTED',
        })
        .select({ receiptNumbers: 1 })
        .lean();
    console.log(requestRecords);

    const lastReceiptNumbers = requestRecords.map(({ receiptNumbers }) => {
        return receiptNumbers[receiptNumbers.length - 1];
    });
    console.log(lastReceiptNumbers);
    // update task
    for (const receiptNumber of lastReceiptNumbers) {
        await updateTask(receiptNumber);
    }
}
