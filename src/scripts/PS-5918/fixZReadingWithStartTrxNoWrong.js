import ZReading from '../../models/zReading.js';
import { Types } from 'mongoose';
import _ from 'lodash';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

const ObjectId = Types.ObjectId;

function toSequenceNumber(zreadingNumber) {
    if (!zreadingNumber) {
        return undefined;
    }
    const number = zreadingNumber.slice(-8);
    return parseInt(number);
}

const generateReceiptNumber = (registerNum, seqNum) => {
    if (!seqNum) {
        return undefined;
    }
    return registerNum + String(seqNum).padStart(8, '0');
};

async function readFile() {
    const records = [];
    const parser = createReadStream(
        // 'src/scripts/PS-5918/records/zreadingWithStartNumberIssue3.csv',
        // 'src/scripts/PS-5918/records/zreadingWithStartNumberIssue4.csv',
        'src/scripts/PS-5918/records/zreadingWithStartNumberIssue5.csv',
    ).pipe(parse({ columns: true }));
    for await (const record of parser) {
        records.push(record);
    }
    return records;
}

async function fixOne(zreadingInfo) {
    const { zreadingId, startTrxNumber, startORNumber, endTrxNumber, endORNumber } = zreadingInfo;
    const origin = await ZReading.findOne({ _id: new ObjectId(zreadingId) }).lean();
    if (!origin.startTrxNumber) {
        console.log('no startTrxNumber', zreadingId);
        return;
    }
    const registerNum = origin.startTrxNumber.slice(0, 3);
    await ZReading.updateOne(
        { _id: new ObjectId(zreadingId) },
        {
            $set: {
                startTrxNumber: generateReceiptNumber(registerNum, startTrxNumber),
                startORNumber: generateReceiptNumber(registerNum, startORNumber),
                // endTrxNumber: generateReceiptNumber(registerNum, endTrxNumber),
                // endORNumber: generateReceiptNumber(registerNum, endORNumber),
            },
        },
        { returnOriginal: true },
    );
    console.log(
        [
            zreadingId,
            origin.startTrxNumber,
            origin.startORNumber,
            origin.endTrxNumber,
            origin.endORNumber,
        ].join(','),
    );
}

export async function fixZReadingWithStartTrxNoWrong() {
    console.log(
        ['zreadingId', 'startTrxNumber', 'startORNumber', 'endTrxNumber', 'endORNumber'].join(','),
    );

    const zreadings = await readFile();

    for (let i = 0; i < zreadings.length; i++) {
        await fixOne(zreadings[i]);
    }
}
