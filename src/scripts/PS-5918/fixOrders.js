import { parseCsv } from '../../utils/index.js';
import TransactionRecord from '../../models/transactionRecord.js';

export async function fixOrders() {
    const orders = await parseCsv('src/scripts/PS-5918/records/oldOrders.csv', true);
    for (let i = 0; i < orders.length; i++) {
        const { business, receiptNumber, modifiedTime, isCancelled } = orders[i];
        if (isCancelled !== 'true') {
            await TransactionRecord.updateOne(
                { business, receiptNumber },
                { $set: { createdTime: new Date(modifiedTime) } },
            );
        }
    }
}

// manual handle cancel orders

// 由于 cancel 时间的不可控，close zreading 之后仍可以 cancel, 将造成 zreading 数据的微小影响
