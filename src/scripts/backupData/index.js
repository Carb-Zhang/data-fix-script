import TransactionRecord from '../../models/transactionRecord.js';
import Shift from '../../models/shift.js';
import { Types } from 'mongoose';
import { parse } from 'csv-parse';
import { createReadStream, createWriteStream } from 'fs';
const ObjectId = Types.ObjectId;
import csvToJson from 'convert-csv-to-json';
import { shiftsToBackUp } from './record/shiftsToBackUp.js';

const writeEventStream = createWriteStream('shiftsBackupForFixShifts.json');

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

async function getOrdersChangedByFixZReading() {
    return csvToJson
        .fieldDelimiter(',')
        .supportQuotedField(true)
        .getJsonFromCsv('src/scripts/backupData/record/ordersAffectShift20241024.csv');
}

async function backupToJson() {
    let isFirst = true;

    for (let i = 0; i < shiftsToBackUp.length; i++) {
        const { business, shiftId } = shiftsToBackUp[i];

        var prefix = isFirst ? '[' : ',';
        if (isFirst) {
            isFirst = false;
        }
        const shift = await Shift.findOne({ business, shiftId }).lean();
        let docToReturn = prefix + JSON.stringify(shift);
        await writeOneEventDoc(docToReturn);
    }
    await writeOneEventDoc(']');
}

async function backupToCsv() {
    const records = await getOrdersChangedByFixZReading();
    for (let i = 0; i < records.length; i++) {
        const { business, transactionId, registerId } = records[i];
        const order = await TransactionRecord.findOne({
            business,
            registerId: new ObjectId(registerId),
            transactionId,
        }).lean();
        if (!order) {
            console.log([business, transactionId, registerId, 'order not found'].join(','));
        } else {
            console.log(
                [business, transactionId, registerId, order.createdTime.toISOString()].join(','),
            );
        }
    }
}

export async function run() {
    await backupToJson();
}
