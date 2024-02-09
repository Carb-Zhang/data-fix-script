import ThirdPartyOnlineOrder from '../../models/thirdPartyOnlineOrder.js';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';

const writeStream = createWriteStream('fp_orders.json');

function writeOneDoc(str) {
    return new Promise((res, rej) => {
        writeStream.write(str, (err) => {
            if (err) {
                console.log('err', err);
                rej(err);
            } else {
                res();
            }
        });
    });
}

export async function run() {
    const startTime = Math.floor(Date.now() / 1000) - 365 * 24 * 3600;
    const startId = ObjectId.createFromTime(startTime);
    const filter = { _id: { $gt: startId }, channel: 12 };
    let isFirst = true;
    await ThirdPartyOnlineOrder.default
        .find(filter)
        .lean()
        .cursor()
        .eachAsync(async (doc) => {
            var prefix = isFirst ? '[' : ',';
            if (isFirst) {
                isFirst = false;
            }

            let docToReturn = prefix + JSON.stringify(doc);
            await writeOneDoc(docToReturn);
        });
    await writeOneDoc(']');
    writeStream.end(() => console.log('导出完成'));
    await sleep(1000);
}
