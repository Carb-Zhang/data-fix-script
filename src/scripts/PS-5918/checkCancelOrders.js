import TransactionRecord from '../../models/transactionRecord.js';
import { parseCsv } from '../../utils/index.js';

export async function checkCancelOrdersInZReading() {
    const orders = await parseCsv(
        'src/scripts/PS-5918/records/ordersAffectZReading20241024.csv',
        true,
    );

    for (let i = 0; i < orders.length; i++) {
        const { business, receiptNumber } = orders[i];
        const order = await TransactionRecord.findOne({
            business,
            receiptNumber,
            isCancelled: true,
        })
            .select({
                business: 1,
                receiptNumber: 1,
            })
            .lean();
        if (order) {
            console.log(order);
        }
    }
}
