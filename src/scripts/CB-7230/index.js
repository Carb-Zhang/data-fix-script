import InventoryChangeEvent from '../../models/inventoryChangeEvent.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';

const writeStream = createWriteStream('fail_inventory_change_event_without_beep.json');

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
    const filter = {
        status: { $ne: 'SUCCESS' },
        eventType: { $ne: 'ORDER_ONLINE_BEEP_PAY_FIRST_PLACE' },
        'updates.0': { $exists: true },
        isNeedManualCheck: true,
        createdAt: { $gt: new Date('2024-04-25T10:36:23.940+08:00') },
    };

    let isFirst = true;
    await InventoryChangeEvent.default
        .find(filter)
        .sort({ createdAt: -1 })
        .select({ updates: 0 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
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
