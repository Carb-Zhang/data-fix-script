import InventoryChangeEvent from '../../models/inventoryChangeEvent.js';
import TransactionRecord from '../../models/transactionRecord.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';

const writeStream = createWriteStream('orders_with_fail_inv_message.json');

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

const BUSINESS = 'paporma';

async function checkOrdersWithFailMessage() {
    const filter = {
        business: BUSINESS,
        createdTime: { $gt: new Date('2024-04-25T10:36:23.940+08:00') },
        'inventoryChangeMsgTrackInfo.isSendMsg': false,
    };

    let isFirst = true;
    await TransactionRecord.find(filter)
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
            await writeOneDoc(docToReturn);
        });
    await writeOneDoc(']');
    writeStream.end(() => console.log('导出完成'));
    await sleep(1000);
}

export async function run() {
    await checkOrdersWithFailMessage();
}
