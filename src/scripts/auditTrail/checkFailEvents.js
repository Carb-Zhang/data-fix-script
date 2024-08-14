import InventoryChangeEvent from '../../models/inventoryChangeEvent.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';

const writeEventStream = createWriteStream('fail_event.json');

function writeOneEventDoc(str) {
    return new Promise((res, rej) => {
        writeEventStream.write(str, (err) => {
            if (err) {
                console.log('err', err);
                rej(err);
            } else {
                res();
            }
        });
    });
}

export async function checkEvent(business, startTime) {
    const filter = {
        status: { $ne: 'SUCCESS' },
        eventType: { $ne: 'ORDER_ONLINE_BEEP_PAY_FIRST_PLACE' },
        'updates.0': { $exists: true },
        isNeedManualCheck: true,
    };
    if (business) {
        Object.assign(filter, { business });
    }

    if (startTime) {
        Object.assign(filter, { createdAt: { $gt: startTime } });
    }

    let isFirst = true;
    await InventoryChangeEvent.default
        .find(filter)
        .sort({ createdAt: -1 })
        .select({ _id: 1 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(async (doc) => {
            var prefix = isFirst ? '[' : ',';
            if (isFirst) {
                isFirst = false;
            }

            let docToReturn = prefix + JSON.stringify(doc._id.toString());
            await writeOneEventDoc(docToReturn);
        });
    await writeOneEventDoc(']');
    writeEventStream.end(() => console.log('导出完成'));
    await sleep(1000);
}
