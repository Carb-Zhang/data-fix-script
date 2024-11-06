import TransactionRecord from '../../models/transactionRecord.js';
import ZReading from '../../models/zReading.js';
import { Types } from 'mongoose';
import { registersToFix } from './records/registersToFix.js';
import { parseCsv } from '../../utils/csv.js';
import _ from 'lodash';
const ObjectId = Types.ObjectId;

async function getOrdersNumberInfo(business, storeId, registerId, startTime, endTime) {
    var filter = {
        business,
        createdTime: { $lt: endTime, $gte: startTime },
        registerId: new ObjectId(registerId),
        storeId: new ObjectId(storeId),
        transactionType: { $ne: 'PreOrder' },
    };
    const orders = await TransactionRecord.find(filter)
        .select({
            sequenceNumber: 1,
            invoiceSeqNumber: 1,
            transactionType: 1,
            isCancelled: 1,
            modifiedTime: 1,
        })
        .lean();
    const sequenceNumbers = _.map(orders, 'sequenceNumber').filter((num) => num !== undefined);
    const invoiceSeqNumbers = _.map(orders, 'invoiceSeqNumber').filter((num) => num !== undefined);
    const modifiedTimes = _.map(
        _.filter(orders, (o) => !o.isCancelled && o.transactionType === 'Sale'),
        'modifiedTime',
    ).filter((time) => time !== undefined);
    return {
        maxSeq: _.max(sequenceNumbers),
        maxInv: _.max(invoiceSeqNumbers),
        minSeq: _.min(sequenceNumbers),
        minInv: _.min(invoiceSeqNumbers),
        maxModifiedTime: _.max(modifiedTimes),
    };
}

function toSequenceNumber(zreadingNumber) {
    if (!zreadingNumber) {
        return undefined;
    }
    const number = zreadingNumber.slice(-8);
    return parseInt(number);
}

async function checkRegister(business, storeId, registerId) {
    const firstOrderCreateTime = '2024-09-10T12:00:00.000+08:00';
    const res = await ZReading.find({
        business,
        storeId,
        registerId,
        closeTime: { $lte: new Date(firstOrderCreateTime) },
    })
        .sort({ closeTime: -1 })
        .limit(1)
        .lean();
    let lastZReadingCloseTime = _.get(res, '0.closeTime');
    if (!lastZReadingCloseTime) {
        lastZReadingCloseTime = new Date('2024-09-01T12:00:00.000+08:00');
    }

    await ZReading.find({
        business,
        storeId,
        registerId,
        closeTime: { $gt: new Date(firstOrderCreateTime) },
    })
        .sort({ closeTime: 1 })
        .select({
            _id: 1,
            closeTime: 1,
            startORNumber: 1,
            endORNumber: 1,
            startTrxNumber: 1,
            endTrxNumber: 1,
        })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(async (doc) => {
            const { closeTime, startORNumber, endORNumber, startTrxNumber, endTrxNumber, _id } =
                doc;
            const { minSeq, minInv, maxSeq, maxInv, maxModifiedTime } = await getOrdersNumberInfo(
                business,
                storeId,
                registerId,
                lastZReadingCloseTime,
                closeTime,
            );

            lastZReadingCloseTime = closeTime;
            let needFixMin = '';
            let needFixMax = '';
            let modifyTimeWrong = '';

            if (
                minSeq !== toSequenceNumber(startTrxNumber) ||
                minInv !== toSequenceNumber(startORNumber) ||
                maxSeq !== toSequenceNumber(endTrxNumber) ||
                maxInv !== toSequenceNumber(endORNumber) ||
                maxModifiedTime >= closeTime
            ) {
                if (
                    (minSeq || -1) < (toSequenceNumber(startTrxNumber) || -1) ||
                    (minInv || -1) < (toSequenceNumber(startORNumber) || -1)
                ) {
                    needFixMin = 'needFixMin';
                }
                if (
                    (maxSeq || -1) > (toSequenceNumber(endTrxNumber) || -1) ||
                    (maxInv || -1) > (toSequenceNumber(endORNumber) || -1)
                ) {
                    needFixMax = 'needFixMax';
                }
                if (maxModifiedTime >= closeTime) {
                    modifyTimeWrong = 'modifyTimeWrong';
                }

                if (!needFixMin && !needFixMax && !modifyTimeWrong) {
                    return;
                }

                console.log(
                    [
                        business,
                        storeId,
                        registerId,
                        _id,
                        minSeq,
                        minInv,
                        maxSeq,
                        maxInv,
                        needFixMin,
                        needFixMax,
                        modifyTimeWrong,
                    ].join(','),
                );
            }
        });
}

export async function checkAllZReadingWithStartTrxNoWrong() {
    console.log(
        [
            'business',
            'storeId',
            'registerId',
            'zreadingId',
            'startTrxNumber',
            'startORNumber',
            'endTrxNumber',
            'endORNumber',
            'needFixMin',
            'needFixMax',
            'modifyTimeWrong',
        ].join(','),
    );
    const allRegisters = await parseCsv('src/scripts/PS-5918/zreading_1025.csv', true);
    const needCheckRegisters = allRegisters.filter(
        ({ registerId }) => !registersToFix.find((item) => item.registerId === registerId),
    );
    for (let i = 0; i < needCheckRegisters.length; i++) {
        const { business, storeId, registerId } = needCheckRegisters[i];
        await checkRegister(business, storeId, registerId);
    }
}
