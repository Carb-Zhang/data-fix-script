import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;
import TransactionRecord from '../../models/transactionRecord.js';
import * as uuid from 'uuid';
import ZReadingModel from '../../models/zReading.js';

const commonFields = {
    business: 'animalwellness',

    isCancelled: false,
    receiptNumbersBeforeFix: [],
    fixedFee: 0,
    total: 1530,
    subtotal: 1500,
    discount: 0,
    tax: 0,
    employeeNumber: '63204b95146ed80007008196',
    transactionType: 'Sale',
    receiptNumber: '123-1-1-1-1-1-1',
    roundedAmount: 0,
    appVersion: '2.50.0.0',
    serviceCharge: 30,
    serviceChargeTax: 0,
    serviceChargeRate: 0.02,
    registerId: new ObjectId('6513c85804af4e000799a2ad'),
    registerNumber: 1,
    tableId: null,
    pickUpId: null,
    headcount: null,
    pwdCount: null,
    seniorsCount: null,
    takeawayCharges: 0,
    salesChannel: 1,
    comment: '',
    customerId: 'a0cf5fba-7a85-49dc-8b32-da8b8fa45298',
    seniorDiscount: 0,
    pwdDiscount: 0,
    taxableSales: 0,
    taxExemptedSales: 0,
    zeroRatedSales: 0,
    totalDeductedTax: 0,

    storeId: new ObjectId('64da24544d14bd000747b594'),

    minNo: '',
    loyaltyDiscounts: [],
    promotions: [],
    returnProcess: [],
    cost: 0,
    failedToUpdateLoyalty: true,
    revertedReceiptNumber: '9623451519032000',
    __v: 0,
    modifiedTime: new Date('2024-08-08T18:57:42.083+08:00'),
};

const mockData = [
    {
        _id: new ObjectId('66b4a4acaa3794000838b568'),
        createdTime: new Date('2024-08-08T18:57:42.083+08:00'),
        sequenceNumber: 50496,
        receiptNumber: '00000050496',
        invoiceSeqNumber: 50801,
        transactionType: 'Sale',
        transactionId: uuid.v4(),
    },

    /* 2 createdAt:8/8/2024, 6:31:13 PM*/
    {
        _id: new ObjectId('66b49e71c3d18a0007398aaf'),
        createdTime: new Date('2024-08-08T18:31:13.462+08:00'),
        sequenceNumber: 50495,
        receiptNumber: '00000050495',
        invoiceSeqNumber: 50800,
        transactionType: 'Sale',
        transactionId: uuid.v4(),
    },

    /* 3 createdAt:8/8/2024, 6:13:49 PM*/
    {
        _id: new ObjectId('66b49a5d5d3a0d0007a85751'),
        createdTime: new Date('2024-08-08T18:13:39.677+08:00'),
        sequenceNumber: 50494,
        receiptNumber: '00000050494',
        invoiceSeqNumber: 50799,
        transactionType: 'Sale',
        transactionId: uuid.v4(),
    },

    {
        createdTime: new Date('2024-08-15T18:13:39.677+08:00'),
        receiptNumber: '00000150494',
        transactionType: 'Sale',
        transactionId: uuid.v4(),
    },

    {
        createdTime: new Date('2024-08-30T18:13:39.677+08:00'),
        receiptNumber: '023000150494',
        transactionType: 'Sale',
        transactionId: uuid.v4(),
    },
];

const commonFieldsForZreading = {
    business: 'animalwellness',
    registerId: '6513c85804af4e000799a2ad',
    storeId: '64da24544d14bd000747b594',
};

const zreadings = [
    {
        startTrxNumber: '01000001971',
        endTrxNumber: '01000001972',
        startORNumber: '01000001967',
        endORNumber: '01000001968',
        zCount: 1,
        closeTime: new Date('2024-08-05T21:00:58.619+08:00'),
    },
    {
        startTrxNumber: '01000001971',
        endTrxNumber: '01000001972',
        startORNumber: '01000001967',
        endORNumber: '01000001968',
        zCount: 2,
        closeTime: new Date('2024-08-10T21:00:58.619+08:00'),
    },
    {
        closeTime: new Date('2024-08-20T21:00:58.619+08:00'),
        zCount: 3,
    },
    {
        closeTime: new Date('2024-09-20T21:00:58.619+08:00'),
        zCount: 4,
    },
];

export async function prepareData() {
    await TransactionRecord.insertMany(mockData.map((item) => ({ ...commonFields, ...item })));
    await ZReadingModel.insertMany(
        zreadings.map((item) => ({ ...commonFieldsForZreading, ...item })),
    );
}
