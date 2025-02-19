import Stocktake from '../../models/stockTake.js';
import Product from '../../models/product.js';
import EInvoiceRequestRecord from '../../models/eInvoiceRequestRecord.js';
import EInvoiceConsolidationTask from '../../models/eInvoiceConsolidationTask.js';
import BusinessModel from '../../models/business.js';
import TransactionRecord from '../../models/transactionRecord.js';
import OnlineTransaction from '../../models/onlineTransaction.js';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { Types } from 'mongoose';
import ZReadingModel from '../../models/zReading.js';
import { parseCsv } from '../../utils/index.js';

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
    // const eInvoiceRecords = await EInvoiceRequestRecord.default
    //     .find({
    //         business,
    //         requestType: { $in: ['REQUEST_INVOICE'] },
    //     })
    //     .lean()
    //     .select({ receiptNumbers: 1 });
    // const receiptNumbersWithEInvoice = [];
    // eInvoiceRecords.forEach((doc) => receiptNumbersWithEInvoice.push(...doc.receiptNumbers));

    const targetStoreIds = await EInvoiceConsolidationTask.default.distinct('storeId', {
        business,
    });
    let count = 0;

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
        .select({ receiptNumber: 1, eInvoiceInfo: 1, storeId: 1 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync((order) => {
            if (
                targetStoreIds.includes(order.storeId.toString()) &&
                !_.get(order, 'eInvoiceInfo.documentType')
            ) {
                // console.log(order.receiptNumber);
                count++;
            }
            // console.log(order.receiptNumber);
        });

    console.log(count);
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

const EInvoiceStatus = {
    REJECT: 'REJECT',
    SUBMITTED: 'SUBMITTED',
    VALID: 'VALID',
    CANCEL: 'CANCEL',
};

const TransactionType = {
    Sale: 'Sale',
    Return: 'Return',
};

const TransactionChannel = {
    WebStore: 1,
    Beep: 3,
};

const OnlineOrderShippingType = {
    DELIVERY: 'delivery',
    PICKUP: 'pickup',
    DIGITAL: 'digital',
    TAKEAWAY: 'takeaway',
    DINE_IN: 'dineIn',
};

const OnlineOrderPaymentMethod = {
    ONLINE: 'Online',
    OFFLINE: 'Offline',
};
const OnlineOrderStatus = {
    CREATED: 'created',
    PENDING_PAYMENT: 'pendingPayment',
    PENDING_VERIFICATION: 'pendingVerification',
    PAID: 'paid',
    PAYMENT_CANCELLED: 'paymentCancelled',
    READY_FOR_DELIVERY: 'readyForDelivery',
    READY_FOR_PICKUP: 'readyForPickup',
    SHIPPED: 'shipped',
    PICKED_UP: 'pickedUp',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
    CONFIRMED: 'confirmed',
    LOGISTICS_CONFIRMED: 'logisticsConfirmed',
    ACCEPTED: 'accepted',
    DELIVERED: 'delivered',
};

async function testRealMiss(business, receiptNumber) {
    // const orders = await parseCsv('src/scripts/test/missedConsolidateOrders.csv');
    // group the orders by busiess and storeId
    // const groupedOrders = _.groupBy(orders, (order) => `${order.business},${order.storeId}`);
    const eInvoice = await EInvoiceRequestRecord.default
        .find({
            business,
            receiptNumbers: receiptNumber,
            'requestResult.eInvoiceStatus': {
                $in: [EInvoiceStatus.CANCEL, EInvoiceStatus.VALID],
            },
        })
        .lean()
        .select({ _id: 1 });
    if (eInvoice[0]) {
        console.log(receiptNumber, 'not real miss');
    }
}

async function checkMissedOrderForMonth(month) {
    const monthBegin = DateTime.fromFormat(month, 'yyyy-MM', { zone: 'UTC+8' })
        .startOf('month')
        .toJSDate();
    const monthEnd = DateTime.fromFormat(month, 'yyyy-MM', { zone: 'UTC+8' })
        .endOf('month')
        .toJSDate();
    const nextMonth = DateTime.fromJSDate(monthEnd, { zone: 'UTC+8' })
        .plus({ days: 1 })
        .toFormat('yyyy-MM');

    const tasks = await EInvoiceConsolidationTask.default
        .find({ month: nextMonth, status: 'SUCCESS' })
        .lean();

    console.log(['business', 'storeId', 'receiptNumber', 'isOnline', 'transactionType'].join(','));

    for (const task of tasks) {
        const commonFilter = {
            business: task.business,
            storeId: task.storeId,
            createdTime: {
                $gte: monthBegin,
                $lt: monthEnd,
            },
            'eInvoiceInfo.eInvoiceStatus': {
                $nin: [EInvoiceStatus.VALID, EInvoiceStatus.SUBMITTED, EInvoiceStatus.CANCEL],
            },
            isCancelled: { $ne: true },
        };

        const offlineOrders = await TransactionRecord.find({
            ...commonFilter,
            transactionType: { $in: [TransactionType.Return, TransactionType.Sale] },
        })
            .select({ receiptNumber: 1, transactionType: 1 })
            .lean();
        for (const order of offlineOrders) {
            console.log(
                [
                    task.business,
                    task.storeId,
                    order.receiptNumber,
                    false,
                    order.transactionType,
                ].join(','),
            );
            await testRealMiss(task.business, order.receiptNumber);
        }

        const onlineOrders = await OnlineTransaction.find({
            ...commonFilter,
            channel: { $in: [TransactionChannel.WebStore, TransactionChannel.Beep] },
            shippingType: { $ne: OnlineOrderShippingType.DIGITAL },
            status: {
                $nin: [
                    OnlineOrderStatus.CREATED,
                    OnlineOrderStatus.PENDING_PAYMENT,
                    OnlineOrderStatus.PENDING_VERIFICATION,
                    OnlineOrderStatus.PAYMENT_CANCELLED,
                    OnlineOrderStatus.CANCELLED,
                    OnlineOrderStatus.FAILED,
                ],
            },
            paymentMethod: OnlineOrderPaymentMethod.OFFLINE,
        })
            .select({ receiptNumber: 1 })
            .lean();
        for (const order of onlineOrders) {
            console.log([task.business, task.storeId, order.receiptNumber, true, ''].join(','));
            await testRealMiss(task.business, order.receiptNumber);
        }
    }
}

async function testLargeAggr(businessName) {
    const $match = {
        business: businessName,
        createdTime: {
            $gte: new Date('2024-07-04T11:00:27.884+08:00'),
            $lt: new Date('2025-07-04T11:00:27.884+08:00'),
        },
    };

    var aggregationQuery = TransactionRecord.aggregate([{ $match }]);
    // var aggregationQuery = await TransactionRecord.aggregate([
    //     { $match },
    //     { $sort: { createdTime: 1 } },
    //     { $project: { customerId: 1, items: 1 } },
    //     { $unwind: '$items' },
    //     {
    //         $group: {
    //             _id: null,
    //             customerIds: { $addToSet: '$customerId' },
    //             productIds: { $addToSet: '$items.productId' },
    //         },
    //     },
    // ]);
    aggregationQuery.sort('createdTime');
    aggregationQuery
        .project({ customerId: 1, items: 1 })
        .unwind('items')
        .group({
            _id: null,
            customerIds: { $addToSet: '$customerId' },
            productIds: { $addToSet: '$items.productId' },
        });

    console.log('start', new Date());
    const count = await TransactionRecord.count($match);
    const result = await aggregationQuery.exec();

    console.log(count, result[0].productIds.length);
    console.log('end', new Date());
}

async function checkFinishFix() {
    const records = await EInvoiceRequestRecord.default
        .find({
            requestType: { $in: ['CONSOLIDATE_INVOICE'] },
            createdAt: { $gt: new Date('2025-02-10T22:26:44.428+08:00') },
            'requestResult.eInvoiceStatus': {
                $in: [EInvoiceStatus.VALID],
            },
        })
        .lean()
        .select({ receiptNumbers: 1 });
    let count = 0;
    records.forEach((r) => (count += r.receiptNumbers.length));
    console.log('total', count);
}

async function fixCode(doc) {
    let neetFix = false;
    doc.stores.forEach((store) => {
        if (_.get(store, 'eInvoiceSetting.isEInvoiceReady')) {
            neetFix = true;
        }
    });
    if (!neetFix) {
        return;
    }
    doc.defaultProductClassificationCode = '022';
    await doc.save();
}

async function setClassificationCode() {
    await BusinessModel.find({
        isEInvoiceEnabled: true,
    })
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(fixCode);
}

export async function run() {
    // await checkMissedOrderForMonth('2025-01');
    // await checkFinishFix();
    // await testRealMiss();
    // await testLargeAggr('bigappledonuts');
    // await testLargeAggr('thesafehouse');
    // await testLargeAggr('onlytestaccount');
    await setClassificationCode();
}
