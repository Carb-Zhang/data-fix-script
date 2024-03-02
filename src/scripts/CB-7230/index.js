import InventoryChangeEvent from '../../models/inventoryChangeEvent.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';

const writeStream = createWriteStream('fail_inventory_change_event.json');

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
    const filter = { status: { $ne: 'SUCCESS' } };

    let isFirst = true;
    await InventoryChangeEvent.default
        .find(filter)
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
