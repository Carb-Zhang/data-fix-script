import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;
import TransactionRecord from '../../models/transactionRecord.js';
import Business from '../../models/business.js';
import _ from 'lodash';
import ZReadingModel from '../../models/zReading.js';
import { createWriteStream } from 'fs';

const writeOrderStream = createWriteStream('old_orders.json');
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

const businessName = 'animalwellness';
const registersToFix = [
    /* 1 */
    {
        storeId: new ObjectId('64da24544d14bd000747b594'),
        registerId: new ObjectId('6513c85804af4e000799a2ad'),
    },

    /* 2 */
    {
        storeId: new ObjectId('582f008a29ae63af786a876d'),
        registerId: new ObjectId('5923cdb650970b7d3a66682a'),
    },

    /* 3 */
    {
        storeId: new ObjectId('5825d9d9c7e536be3e8ad90d'),
        registerId: new ObjectId('58638156168c89935d76ce0c'),
    },

    /* 4 */
    {
        storeId: new ObjectId('5945db9943962aa21f930229'),
        registerId: new ObjectId('593fa9d5b022fae11fc11672'),
    },

    /* 5 */
    {
        storeId: new ObjectId('64642b3f4776a50008d34697'),
        registerId: new ObjectId('64642d76e3504d0007cef797'),
    },

    /* 6 */
    {
        storeId: new ObjectId('5825d9d9c7e536be3e8ad90d'),
        registerId: new ObjectId('63e20115c7dfeb00079bc0f3'),
    },

    /* 7 */
    {
        storeId: new ObjectId('582f0193b4ebadad78f9b31d'),
        registerId: new ObjectId('5825d9d9c7e536be3e8ad90e'),
    },
];

const generateReceiptNumber = (registerNum, seqNum) => {
    if (!seqNum) {
        return undefined;
    }
    return String(registerNum - 1).padStart(3, '0') + String(seqNum).padStart(8, '0');
};

async function getStartInfo(storeId, registerId) {
    const commonFilter = {
        business: businessName,
        storeId,
        registerId,
        transactionType: { $ne: 'PreOrder' },
        createdTime: { $gt: new Date('2024-07-01T00:00:00.000+08:00') },
    };
    const lastOrderWithSequenceNumber = await TransactionRecord.find({
        ...commonFilter,
        sequenceNumber: { $exists: true },
    })
        .sort({ createdTime: -1 })
        .limit(1);

    const beginSeqNumber = lastOrderWithSequenceNumber[0].sequenceNumber;

    const lastOrderWithInvSeqNumber = await TransactionRecord.find({
        ...commonFilter,
        invoiceSeqNumber: { $exists: true },
    })
        .sort({ createdTime: -1 })
        .limit(1);
    const beginInvSeqNumber = lastOrderWithInvSeqNumber[0].invoiceSeqNumber;

    return {
        beginSeqNumber,
        beginInvSeqNumber,
        beginCreateTime: lastOrderWithSequenceNumber[0].createdTime,
    };
}

const TransactionType = {
    Sale: 'Sale',
    Return: 'Return',
};

let isFirst = true;

async function fixRegisterOrders(storeId, registerId, registerNum) {
    let { beginSeqNumber, beginInvSeqNumber, beginCreateTime } = await getStartInfo(
        storeId,
        registerId,
    );

    await TransactionRecord.find({
        business: businessName,
        transactionType: { $ne: 'PreOrder' },
        registerId,
        createdTime: { $gt: beginCreateTime },
    })
        .sort({ createdTime: 1 })
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(async (doc) => {
            if (!Object.values(TransactionType).includes(doc.transactionType)) {
                return;
            }
            var prefix = isFirst ? '[' : ',';
            if (isFirst) {
                isFirst = false;
            }
            await writeOneOrderDoc(
                prefix +
                    JSON.stringify(
                        _.pick(doc, ['_id', 'sequenceNumber', 'receiptNumber', 'invoiceSeqNumber']),
                    ),
            );

            beginSeqNumber++;
            doc.sequenceNumber = beginSeqNumber;
            doc.receiptNumber = generateReceiptNumber(registerNum, beginSeqNumber);

            if (doc.transactionType === 'Sale') {
                beginInvSeqNumber++;
                doc.invoiceSeqNumber = beginInvSeqNumber;
            }
            await doc.save();
        });
}

async function getInvoiceNumberInfo(storeId, registerId, startTime, endTime, registerNum) {
    const filter = {
        business: businessName,
        createdTime: { $lt: endTime, $gte: startTime },
        registerId,
        transactionType: { $ne: 'PreOrder' },
    };
    const sequenceNumbers = await TransactionRecord.distinct('sequenceNumber', filter);
    const invoiceSeqNumbers = await TransactionRecord.distinct('invoiceSeqNumber', filter);
    const validSequenceNumbers = sequenceNumbers.filter((item) => !!item);
    const validInvoiceSeqNumbers = invoiceSeqNumbers.filter((item) => !!item);
    return {
        startTrxNumber: generateReceiptNumber(registerNum, _.min(validSequenceNumbers)),
        endTrxNumber: generateReceiptNumber(registerNum, _.max(validSequenceNumbers)),
        startORNumber: generateReceiptNumber(registerNum, _.min(validInvoiceSeqNumbers)),
        endORNumber: generateReceiptNumber(registerNum, _.max(validInvoiceSeqNumbers)),
    };
}

async function fixZReadings(storeId, registerId, registerNum) {
    const validZReadings = await ZReadingModel.find({
        business: businessName,
        storeId: storeId.toString(),
        registerId: registerId.toString(),
        $and: [
            {
                startTrxNumber: { $exists: true },
                endTrxNumber: { $exists: true },
                startORNumber: { $exists: true },
                endORNumber: { $exists: true },
            },
        ],
    })
        .sort({ zCount: -1 })
        .limit(2)
        .lean();

    const firstZReading = validZReadings[1];
    if (!firstZReading) {
        console.log('valid zreading not found', storeId, registerId);
    }

    let startTime = firstZReading.closeTime;

    await ZReadingModel.find({
        business: businessName,
        storeId: storeId.toString(),
        registerId: registerId.toString(),
        zCount: { $gt: firstZReading.zCount },
    })
        .sort({ zCount: 1 })
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(async (doc) => {
            const invoiceNumberInfo = await getInvoiceNumberInfo(
                storeId,
                registerId,
                startTime,
                doc.closeTime,
                registerNum,
            );
            startTime = doc.closeTime;
            Object.assign(doc, invoiceNumberInfo);
            await doc.save();
        });
}

export async function fixReceiptNumbers() {
    for (let i = 0; i < registersToFix.length; i++) {
        const { storeId, registerId } = registersToFix[i];
        const business = await Business.findOne({ name: businessName }).lean();
        const register = business.cashRegisters.find(
            ({ _id }) => _id.toString() === registerId.toString(),
        );
        await fixRegisterOrders(storeId, registerId, register.registerId);
        await fixZReadings(storeId, registerId, register.registerId);
    }
    await writeOneOrderDoc(']');
    writeOrderStream.end(() => console.log('导出完成'));
}
