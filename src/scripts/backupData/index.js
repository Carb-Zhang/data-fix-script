import TransactionRecord from '../../models/transactionRecord.js';
import Shift from '../../models/shift.js';
import { Types } from 'mongoose';
import { parse } from 'csv-parse';
import { createReadStream, createWriteStream } from 'fs';
import csvToJson from 'convert-csv-to-json';
import { shiftsToBackUp } from './record/shiftsToBackUp.js';

import BusinessModel from '../../models/business.js';
import _ from 'lodash';

const ObjectId = Types.ObjectId;
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

export async function getRegisterTokens() {
    const orders = await getOrdersChangedByFixZReading();

    const registers = _.uniqBy(
        orders.map(({ registerId, business }) => ({ registerId, business })),
        'registerId',
    );

    let businessInfos = await BusinessModel.find({
        name: { $in: registers.map(({ business }) => business) },
    })
        .select({ name: 1, cashRegisters: 1 })
        .lean();
    registers.forEach(({ registerId, business }) => {
        const businessInfo = businessInfos.find((bus) => bus.name === business);
        const register = businessInfo.cashRegisters.find(
            (bus) => bus._id.toString() === registerId,
        );
        if (!register) {
            console.log([registerId, 'register not found'].join(','));
        } else {
            console.log([registerId, register.apiToken].join(','));
        }
    });
}

export async function run() {
    await getRegisterTokens();
}
