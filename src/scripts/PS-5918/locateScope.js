import TransactionRecord from '../../models/transactionRecord.js';
import { checkOrderWithShift } from './checkOrderWithShift.js';
import Shift from '../../models/shift.js';
import ZReading from '../../models/zReading.js';
import { Types } from 'mongoose';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
const ObjectId = Types.ObjectId;

// const shiftRegistersCsv = 'src/scripts/PS-5918/shift-1024-1.csv';
// const zreadingRegistersCsv = 'src/scripts/PS-5918/zreading_1025-1.csv';

const shiftRegistersCsv = 'src/scripts/PS-5918/shift-1024.csv';
const zreadingRegistersCsv = 'src/scripts/PS-5918/zreading_1025.csv';

async function getRegisters(isShift) {
    const records = [];
    const parser = createReadStream(isShift ? shiftRegistersCsv : zreadingRegistersCsv).pipe(
        parse({ columns: true }),
    );
    for await (const record of parser) {
        records.push(record);
    }
    return records;
}

async function getRegisterShifts(business, registerId, storeId) {
    const shifts = await Shift.find({
        business,
        registerObjectId: registerId,
        storeId,
        closeTime: { $gt: new Date('2024-09-17T12:00:00.000+08:00') },
    })
        .sort({ openTime: -1 })
        .lean();
    return shifts;
}

function commonFilter(business, registerId) {
    return {
        business,
        registerId: new ObjectId(registerId),
        transactionType: { $nin: ['Return', 'PreOrder'] },
        modifiedTime: { $gt: new Date('2024-09-19T12:00:00.000+08:00') },
        $expr: { $ne: ['$modifiedTime', '$createdTime'] },
        channel: 2,
    };
}

async function locateShiftRegisterOrders(business, registerId, storeId) {
    const shifts = await getRegisterShifts(business, registerId, storeId);
    const filter = {
        ...commonFilter(business, registerId),
        isCancelled: { $ne: true },
    };
    await TransactionRecord.find(filter)
        .sort({ _id: 1 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync((order) => {
            checkOrderWithShift(business, registerId, order, shifts);
        });
}

async function locateShiftScope() {
    const registers = await getRegisters(true);
    for (let i = 0; i < registers.length; i++) {
        await locateShiftRegisterOrders(
            registers[i].business,
            registers[i].registerid,
            registers[i].storeid,
        );
    }
}

async function getRegisterZReadings(business, registerId, storeId) {
    const zreadings = await ZReading.find({
        business,
        storeId,
        registerId,
        closeTime: { $gt: new Date('2024-09-17T12:00:00.000+08:00') },
    })
        .select({
            closeTime: 1,
            endTrxNumber: 1,
        })
        .sort({ closeTime: 1 })
        .lean();
    return zreadings;
}

function toSequenceNumber(endTrxNumber) {
    if (!endTrxNumber) {
        return -1;
    }
    const number = endTrxNumber.slice(-8);
    return parseInt(number);
}

async function locateZReadingRegisterOrders(business, registerId, storeId) {
    const zreadings = await getRegisterZReadings(business, registerId, storeId);
    if (zreadings.length === 0) {
        console.log('no zreading found', business, registerId, storeId);
        return;
    }

    const filter = {
        ...commonFilter(business, registerId),
        createdTime: {
            $gte: new Date('2024-09-17T12:00:00.000+08:00'),
            $lt: zreadings[zreadings.length - 1].closeTime,
        },
        sequenceNumber: { $exists: true },
    };

    let currentIndex = 0;
    let zreadingStart = new Date('2024-09-17T12:00:00.000+08:00');
    let currentZReading = zreadings[currentIndex];
    let zreadingEnd = currentZReading.closeTime;

    await TransactionRecord.find(filter)
        .select({
            createdTime: 1,
            sequenceNumber: 1,
            transactionId: 1,
            receiptNumber: 1,
            preOrderId: 1,
        })
        .sort({ createdTime: 1 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(
            ({
                createdTime: oCreatedTime,
                sequenceNumber: oSequenceNumber,
                transactionId,
                receiptNumber,
                preOrderId,
            }) => {
                // find the zreading
                while (!(oCreatedTime >= zreadingStart && oCreatedTime < zreadingEnd)) {
                    if (currentIndex >= zreadings.length) {
                        break;
                    }
                    currentIndex++;
                    zreadingStart = zreadingEnd;
                    currentZReading = zreadings[currentIndex];
                    zreadingEnd = currentZReading.closeTime;
                }

                // print the wrong order
                if (currentIndex >= zreadings.length) {
                    console.log('cannot find correspond zreading', business, registerId, storeId);
                    return;
                }

                if (oSequenceNumber > toSequenceNumber(currentZReading.endTrxNumber)) {
                    console.log(
                        [
                            business,
                            registerId,
                            transactionId,
                            receiptNumber,
                            preOrderId,
                            '',
                            '',
                            '',
                        ].join(','),
                    );
                }
            },
        );
}

async function locateZReadingScope() {
    const registers = await getRegisters(false);
    for (let i = 0; i < registers.length; i++) {
        await locateZReadingRegisterOrders(
            registers[i].business,
            registers[i].registerid,
            registers[i].storeid,
        );
    }
}

export async function locateScope() {
    console.log('---------------start check zreading orders---------------');
    await locateZReadingScope();
    console.log('---------------start check shift orders---------------');
    await locateShiftScope();
}
