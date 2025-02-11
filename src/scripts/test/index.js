import Stocktake from '../../models/stockTake.js';
import Product from '../../models/product.js';
import EInvoiceRequestRecord from '../../models/eInvoiceRequestRecord.js';
import TransactionRecord from '../../models/transactionRecord.js';
import _ from 'lodash';
import { DateTime } from 'luxon';

export async function run() {
    const business = 'bigappledonuts';
    const storeId = '67568ad3d4c3e50007e83061';
    const lastMonthBegin = DateTime.now()
        .setZone('UTC+8')
        .startOf('month')
        .minus({ months: 1 })
        .toJSDate();
    const lastMonthEnd = DateTime.now().setZone('UTC+8').startOf('month').toJSDate();
    const eInvoiceRecords = await EInvoiceRequestRecord.default.find({
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
            if (receiptNumbersWithEInvoice.includes(order.receiptNumber)) {
                console.log(order.receiptNumber);
            }
        });
}
