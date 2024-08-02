import InventoryChangeEvent from '../../models/inventoryChangeEvent.js';
import TransactionRecord from '../../models/transactionRecord.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';

const writeOrderStream = createWriteStream('orders_with_fail_inv_message.json');

function writeOneOrderDoc(str) {
    return new Promise((res, rej) => {
        writeOrderStream.write(str, (err) => {
            if (err) {
                console.log('err', err);
                rej(err);
            } else {
                res();
            }
        });
    });
}

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

const BUSINESS = 'onlytestaccount';

async function checkOrdersWithFailMessage() {
    const filter = {
        business: BUSINESS,
        createdTime: { $gt: new Date('2024-04-25T10:36:23.940+08:00') },
        'inventoryChangeMsgTrackInfo.isSendMsg': false,
    };

    let isFirst = true;
    await TransactionRecord.find(filter)
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
            await writeOneOrderDoc(docToReturn);
        });
    await writeOneOrderDoc(']');
    writeOrderStream.end(() => console.log('导出完成'));
    await sleep(1000);
}

async function checkEvent() {
    const filter = {
        business: BUSINESS,
        status: { $ne: 'SUCCESS' },
        eventType: { $ne: 'ORDER_ONLINE_BEEP_PAY_FIRST_PLACE' },
        'updates.0': { $exists: true },
        isNeedManualCheck: true,
        createdAt: { $gt: new Date('2024-03-25T10:36:23.940+08:00') },
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
            await writeOneEventDoc(docToReturn);
        });
    await writeOneEventDoc(']');
    writeEventStream.end(() => console.log('导出完成'));
    await sleep(1000);
}

export async function run() {
    await checkOrdersWithFailMessage();
    await checkEvent();
}
