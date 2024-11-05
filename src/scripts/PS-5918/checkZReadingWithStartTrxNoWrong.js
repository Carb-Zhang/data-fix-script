import TransactionRecord from '../../models/transactionRecord.js';
import ZReading from '../../models/zReading.js';
import { Types } from 'mongoose';
import { registersToFix } from './records/registersToFix.js';
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
        .select({ sequenceNumber: 1, invoiceSeqNumber: 1 })
        .lean();
    const sequenceNumbers = _.map(orders, 'sequenceNumber').filter((num) => num !== undefined);
    const invoiceSeqNumbers = _.map(orders, 'invoiceSeqNumber').filter((num) => num !== undefined);
    return {
        maxSeq: _.max(sequenceNumbers),
        maxInv: _.max(invoiceSeqNumbers),
        minSeq: _.min(sequenceNumbers),
        minInv: _.min(invoiceSeqNumbers),
    };
}

function toSequenceNumber(zreadingNumber) {
    if (!zreadingNumber) {
        return undefined;
    }
    const number = zreadingNumber.slice(-8);
    return parseInt(number);
}

async function checkRegister(business, storeId, registerId, firstOrderCreateTime) {
    if (business !== 'opcfactoryoutletcaloocan') {
        return;
    }

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
        console.log('Get lastZReadingCloseTime fail');
        return;
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
            const { minSeq, minInv, maxSeq, maxInv } = await getOrdersNumberInfo(
                business,
                storeId,
                registerId,
                lastZReadingCloseTime,
                closeTime,
            );

            lastZReadingCloseTime = closeTime;

            if (
                minSeq !== toSequenceNumber(startTrxNumber) ||
                minInv !== toSequenceNumber(startORNumber) ||
                maxInv !== toSequenceNumber(endORNumber) ||
                maxSeq !== toSequenceNumber(endTrxNumber)
            ) {
                console.log(
                    [business, storeId, registerId, _id, minSeq, minInv, maxSeq, maxInv].join(','),
                );
                console.log(
                    [
                        business,
                        storeId,
                        registerId,
                        _id,
                        startTrxNumber,
                        startORNumber,
                        endTrxNumber,
                        endORNumber,
                    ].join(','),
                );
            }
        });
}

export async function checkZReadingWithStartTrxNoWrong() {
    for (let i = 0; i < registersToFix.length; i++) {
        const { business, storeId, registerId, firstOrderCreateTime } = registersToFix[i];
        await checkRegister(business, storeId, registerId, firstOrderCreateTime);
    }
}
