import TransactionRecord from '../../models/transactionRecord.js';
import EInvoiceRequestRecord from '../../models/eInvoiceRequestRecord.js';

const docIdsToReset = [
    'QYBNC016QCB85P96B0P5KK9J10',
    '73YNJA9Z4TN6YBQDFNM5KK9J10',
    'SR96SYFVQG6EYWWNZ5K5KK9J10',
    '4GJ9FHE9HTMGDZ9BVPH5KK9J10',
    'TTJFG3A8MTCYJW0K77G5KK9J10',
    'DWDNBNW63AZQJ73PFPE5KK9J10',
    'FB95Z4E6VGKTFZV0X3D5KK9J10',
    'SP9WKMBFEZBMF3XDC8B5KK9J10',
];

const business = 'iskl';

export async function resetOrdersEInvoiceInfo() {
    const docs = await EInvoiceRequestRecord.default
        .find({
            business,
            // 'requestResult.documentId': { $in: docIdsToReset },
        })
        .select({ receiptNumbers: 1 })
        .lean();
    const receiptNumbers = [];
    docs.forEach((doc) => receiptNumbers.push(...doc.receiptNumbers));
    await TransactionRecord.updateMany(
        { business, receiptNumber: { $in: receiptNumbers } },
        { $unset: { eInvoiceInfo: '' } },
    );
}
