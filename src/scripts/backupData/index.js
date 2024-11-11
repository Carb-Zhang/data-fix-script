import TransactionRecord from '../../models/transactionRecord.js';
import Shift from '../../models/shift.js';
import { Types } from 'mongoose';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
const ObjectId = Types.ObjectId;
import csvToJson from 'convert-csv-to-json';

async function getOrdersChangedByFixZReading() {
    return csvToJson
        .fieldDelimiter(',')
        .supportQuotedField(true)
        .getJsonFromCsv('src/scripts/backupData/record/ordersAffectShift20241024.csv');
}

async function backupToJson() {}

async function backupToCsv(records) {
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
    const records = await getOrdersChangedByFixZReading();
    await backupToCsv(records);
}
