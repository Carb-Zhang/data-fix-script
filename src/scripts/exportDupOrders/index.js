import DupOrderModel from '../../models/transactionRecordsWithDuplicatedId.js';
import { Types } from 'mongoose';

export async function run() {
    const filter = {
        business: 'waksshake',
        registerId: new Types.ObjectId('649bd5c311d3720008c016ad'),
        receiptNumber: { $regex: '^007' },
    };
    const orders = await DupOrderModel.find(filter).lean();
    console.log(JSON.stringify(orders));
}
