import Stocktake from '../../models/stockTake.js';
import Product from '../../models/product.js';
import EInvoiceRequestRecord from '../../models/eInvoiceRequestRecord.js';
import TransactionRecord from '../../models/transactionRecord.js';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { Types } from 'mongoose';
import ZReadingModel from '../../models/zReading.js';

export async function run1() {
    const business = 'bigappledonuts';
    const storeId = '67568ad3d4c3e50007e83061';
    const lastMonthBegin = DateTime.now()
        .setZone('UTC+8')
        .startOf('month')
        .minus({ months: 1 })
        .toJSDate();
    const lastMonthEnd = DateTime.now().setZone('UTC+8').startOf('month').toJSDate();
    const eInvoiceRecords = await EInvoiceRequestRecord.default
        .find({
            business: 'bigappledonuts',
            storeId: '67568ad3d4c3e50007e83061',
            requestType: { $in: ['CONSOLIDATE_INVOICE'] },
        })
        .lean()
        .select({ receiptNumbers: 1 });
    const receiptNumbersWithEInvoice = [];
    eInvoiceRecords.forEach((doc) => receiptNumbersWithEInvoice.push(...doc.receiptNumbers));
    await TransactionRecord.find({
        business,
        storeId,
        createdTime: {
            $gte: lastMonthBegin,
            $lt: lastMonthEnd,
        },
        isCancelled: { $ne: true },
    })
        .sort({ createdTime: 1 })
        .select({ receiptNumber: 1 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync((order) => {
            if (!receiptNumbersWithEInvoice.includes(order.receiptNumber)) {
                console.log(order.receiptNumber);
            }
        });
}
export async function run2() {
    const business = 'bigappledonuts';
    const lastMonthBegin = DateTime.now()
        .setZone('UTC+8')
        .startOf('month')
        .minus({ months: 1 })
        .toJSDate();
    const lastMonthEnd = DateTime.now().setZone('UTC+8').startOf('month').toJSDate();
    const eInvoiceRecords = await EInvoiceRequestRecord.default
        .find({
            business: 'bigappledonuts',
            requestType: { $in: ['REQUEST_INVOICE'] },
        })
        .lean()
        .select({ receiptNumbers: 1 });
    const receiptNumbersWithEInvoice = [];
    eInvoiceRecords.forEach((doc) => receiptNumbersWithEInvoice.push(...doc.receiptNumbers));

    await TransactionRecord.find({
        business,
        createdTime: {
            $gte: lastMonthBegin,
            $lt: lastMonthEnd,
        },
        // receiptNumber: { $in: receiptNumbersWithEInvoice },
        isCancelled: { $ne: true },
    })
        .sort({ createdTime: 1 })
        .select({ receiptNumber: 1, eInvoiceInfo: 1 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync((order) => {
            if (_.get(order, 'eInvoiceInfo.documentType') !== 'CONSOLIDATE_INVOICE') {
                console.log(order.receiptNumber);
            }
            // console.log(order.receiptNumber);
        });
}

const commonFieldsForZreading = {
    business: 'carb01',
    registerId: '64f8059b11ea010007ddd652',
    storeId: '64da24544d14bd000747b594',
};

async function mockData() {
    const arrayFromZeroToHundred = Array.from({ length: 60 }, (_, index) => index);
    console.log(arrayFromZeroToHundred);
    const startDate = new Date('2024-12-10T00:00:00.000+08:00');
    await ZReadingModel.insertMany(
        arrayFromZeroToHundred.map((index) => ({
            ...commonFieldsForZreading,
            zCount: index,
            closeTime: DateTime.fromJSDate(startDate).plus({ days: index }).toJSDate(),
        })),
    );
}

export async function run() {
    await run2();
}
