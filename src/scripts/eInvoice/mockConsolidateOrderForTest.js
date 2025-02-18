import TransactionRecord from '../../models/transactionRecord.js';
import OnlineTransaction from '../../models/onlineTransaction.js';
import EInvoiceRequestRecord from '../../models/eInvoiceRequestRecord.js';

const business = 'kafe123';

export async function mockConsolidateOrderForTest(isRevert) {
    const receiptNumbers = ['0022501151903532', '853093906733432'];

    const documentType = isRevert ? 'INVOICE' : 'CONSOLIDATE_INVOICE';
    const recordUpdateInfo = { $set: { eInvoiceDocumentType: documentType } };
    const orderUpdateInfo = { $set: { 'eInvoiceInfo.documentType': documentType } };

    await EInvoiceRequestRecord.default.updateMany(
        {
            business,
            receiptNumbers: { $in: receiptNumbers },
        },
        recordUpdateInfo,
    );

    await TransactionRecord.updateMany(
        { business, receiptNumber: { $in: receiptNumbers } },
        orderUpdateInfo,
    );

    await OnlineTransaction.updateMany(
        { business, receiptNumber: { $in: receiptNumbers } },
        orderUpdateInfo,
    );
}
