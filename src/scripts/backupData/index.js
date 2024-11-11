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
        const { business, transactionId, receiptNumber } = records[i];
        const order = await TransactionRecord.findOne({ business, receiptNumber }).lean();
        console.log([business, transactionId, receiptNumber, order.createdTime].join(','));
    }
}

export async function run() {
    const records = await getOrdersChangedByFixZReading();
    await backupToCsv(records);
}
