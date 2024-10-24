import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;
import TransactionRecord from '../../models/transactionRecord.js';
import * as uuid from 'uuid';
import Shift from '../../models/shift.js';

const business = 'threeguysbangsar';
const registerId = '64c8bd1a07f67d00075193ff';

const commonFieldsForOrder = {
    business,
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
    registerId: new ObjectId(registerId),
    registerNumber: 1,
    tableId: null,
    pickUpId: null,
    headcount: null,
    pwdCount: null,
    seniorsCount: null,
    takeawayCharges: 0,
    salesChannel: 1,
    comment: 'test',
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
    modifiedTime: new Date('2024-10-09T18:57:42.083+08:00'),
};

const mockDataForOrders = [
    {
        createdTime: new Date('2024-10-08T18:57:42.083+08:00'),
        sequenceNumber: 50496,
        receiptNumber: '00000050496',
        invoiceSeqNumber: 50801,
        transactionType: 'Sale',
        transactionId: uuid.v4(),
    },

    /* 2 createdAt:8/8/2024, 6:31:13 PM*/
    {
        createdTime: new Date('2024-10-08T18:31:13.462+08:00'),
        sequenceNumber: 50495,
        receiptNumber: '00000050495',
        invoiceSeqNumber: 50800,
        transactionType: 'Sale',
        transactionId: uuid.v4(),
    },
];

const mockDataForShifts = [
    {
        _id: new ObjectId('671a1c9f98ba6f0007eed8e2'),
        beepTransactionIds: [],
        registerTransactionIds: [],
        enableCashback: true,
        business,
        shiftId: '1c3a2190-a143-4ab2-8969-c7bcb922bf31',
        registerId: '1',
        registerObjectId: registerId,
        minNo: '',
        storeId: '62e892dcd4a2080007eaf68e',
        openTime: new Date('2024-10-06T18:04:28.459+08:00'),
        closeTime: new Date('2024-10-09T18:08:31.333+08:00'),
        openingAmount: 0,
        closingAmount: 0,
        openBy: '62e892dcd4a2080007eaf695',
        closeBy: '62e892dcd4a2080007eaf695',
        salesRoundedAmount: 0,
        returnsRoundedAmount: 0,
        cashSalesRoundedAmount: 0,
        cashReturnsRoundedAmount: 0,
        discountedCount: 0,
        discountedAmount: 0,
        cancelledCount: 0,
        cancelledAmount: 0,
        payouts: [],
        payIns: [],
        loyaltyDiscounts: {
            sales: {
                amount: 0,
                count: 0,
            },
            totalLoyaltyDiscountCount: 0,
        },
        registerTransactions: [],
        beepTransactions: [],
        totalSalesAmount: 0,
        registerAppVersion: '2.51.1.0',
        taxSummary: [],
        __v: 0,
    },
];

export async function prepareData() {
    await TransactionRecord.deleteMany({ business });
    await Shift.deleteMany({ business });
    await TransactionRecord.insertMany(
        mockDataForOrders.map((item) => ({ ...commonFieldsForOrder, ...item })),
    );
    await Shift.insertMany(mockDataForShifts);
}
