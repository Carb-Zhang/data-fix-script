import TransactionRecord from '../../models/transactionRecord.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';
import { Types } from 'mongoose';

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

export async function checkOrdersWithFailMessage(business, startTime, endTime) {
    const filter = {
        'inventoryChangeMsgTrackInfo.isSendMsg': false,
        _id: {
            // $gte: new Types.ObjectId('66bef16c2146ff00070ca9ff'),
            // $lte: new Types.ObjectId('66bef5d9679604000734ccfc'),
            $gte: new Types.ObjectId.createFromTime(startTime),
            $lte: new Types.ObjectId.createFromTime(endTime),
        },
    };

    if (business) {
        Object.assign(filter, { business });
    }

    if (startTime) {
        Object.assign(filter, { createdTime: { $gt: startTime } });
    }

    if (endTime) {
        Object.assign(filter, { createdTime: { $lt: endTime } });
    }

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
