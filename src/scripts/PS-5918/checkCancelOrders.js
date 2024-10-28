import TransactionRecord from '../../models/transactionRecord.js';
import { parseCsv } from '../../utils/index.js';

export async function checkCancelOrdersInZReading() {
    const orders = await parseCsv(
        'src/scripts/PS-5918/records/ordersAffectZReading20241024.csv',
        true,
    );

    const filter = { $or: [], isCancelled: true };
    orders.forEach(({ business, receiptNumber }) =>
        filter.$or.push({
            business,
            receiptNumber,
        }),
    );

    const res = await TransactionRecord.find(filter)
        .select({
            business: 1,
            receiptNumber: 1,
        })
        .lean();
    console.log(res);
}
