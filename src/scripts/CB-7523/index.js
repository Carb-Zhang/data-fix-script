import ThirdPartyOnlineOrder from '../../models/thirdPartyOnlineOrder.js';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

export async function run() {
    const startId = ObjectId.createFromTime(
        new Date('2024-02-01T00:00:00.000+08:00').getTime() / 1000,
    );
    const count = await ThirdPartyOnlineOrder.default.count({ _id: { $gt: startId }, channel: 12 });
    console.log(count);
}
