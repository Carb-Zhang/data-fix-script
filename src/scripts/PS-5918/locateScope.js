import TransactionRecord from '../../models/transactionRecord.js';
import { checkOrderWithShift } from './checkOrderWithShift.js';
import Shift from '../../models/shift.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';
import { Types } from 'mongoose';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
const ObjectId = Types.ObjectId;

const shiftRegistersCsv = 'src/scripts/PS-5918/shift-1024-1.csv';

async function getShiftRegisters() {
    const records = [];
    const parser = createReadStream(shiftRegistersCsv).pipe(parse({ columns: true }));
    for await (const record of parser) {
        records.push(record);
    }
    return records;
}

async function getRegisterShifts(business, registerId) {
    const shifts = await Shift.find({
        business,
        registerObjectId: registerId,
        storeId: '64c8bd1a07f67d00075193f3',
        closeTime: { $gt: new Date('2024-09-17T12:00:00.000+08:00') },
    }).lean();
    return shifts;
}

async function locateRegister(business, registerId) {
    const shifts = await getRegisterShifts(business, registerId);
    const filter = {
        business,
        registerId: new ObjectId(registerId),
        transactionType: { $nin: ['Return', 'PreOrder'] },
        isCancel: { $ne: true },
        modifiedTime: { $gt: new Date('2024-09-19T12:00:00.000+08:00') },
        $expr: { $ne: ['$modifiedTime', '$createdTime'] },
    };
    await TransactionRecord.find(filter)
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync((order) => {
            checkOrderWithShift(business, registerId, order, shifts);
        });
}

async function locateShiftScope() {
    const registers = await getShiftRegisters();
    for (let i = 0; i < registers.length; i++) {
        await locateRegister(registers[i].business, registers[i].registerid);
    }
}

export async function locateScope() {
    await locateShiftScope();
}
