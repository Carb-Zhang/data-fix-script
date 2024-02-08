import ThirdPartyOnlineOrder from '../../models/thirdPartyOnlineOrder.js';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

export async function run() {
    const startTime = Math.floor(Date.now() / 1000) - 7 * 24 * 3600;
    const startId = ObjectId.createFromTime(startTime);
    const count = await ThirdPartyOnlineOrder.default.count({ _id: { $gt: startId }, channel: 12 });
    console.log(count);
}
