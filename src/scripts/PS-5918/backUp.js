import TransactionRecord from '../../models/transactionRecord.js';
import { checkOrderWithShift } from './checkOrderWithShift.js';
import { ordersBefore0917 } from './records/ordersBefore0917.js';
import { registersToFix } from './records/registersToFix.js';
import Shift from '../../models/shift.js';
import ZReading from '../../models/zReading.js';
import { Types } from 'mongoose';
import { parseCsv } from '../../utils/index.js';
import _ from 'lodash';
const ObjectId = Types.ObjectId;

const affectedOrdersPath = 'src/scripts/PS-5918/records/ordersAffectZReading20241024.csv';
const couldAffectedOrdersPath = 'src/scripts/PS-5918/records/ordersCouldAffectZReading20241024.csv';

async function getAllOrders() {
    const orders1 = await parseCsv(affectedOrdersPath, true);
    const orders2 = await parseCsv(couldAffectedOrdersPath, true);
    return [...orders1, ...orders2, ...ordersBefore0917];
}

async function backUpOrders() {
    const allOrders = await getAllOrders();
    console.log(
        'business,receiptNumber,storeId,registerId,modifiedTime,createdTime,isCancelled,transactionId,preOrderId',
    );
    for (let i = 0; i < allOrders.length; i++) {
        const { business, receiptNumber } = allOrders[i];
        const order = await TransactionRecord.findOne({ business, receiptNumber }).lean();
        if (!order) {
            console.log('Not found,', business, receiptNumber);
        } else {
            console.log(
                [
                    order.business,
                    order.receiptNumber,
                    order.storeId,
                    order.registerId,
                    order.modifiedTime.toISOString(),
                    order.createdTime.toISOString(),
                    order.isCancelled,
                    order.transactionId,
                    order.preOrderId || '',
                ].join(','),
            );
        }
    }
}

async function backUpOneRegisterZReading(business, registerId, storeId, firstOrderCreateTime) {
    const zreadings = await ZReading.find({
        business,
        registerId,
        storeId,
        closeTime: { $gt: new Date(firstOrderCreateTime) },
    })
        .lean()
        .sort({ zCount: 1 });
    zreadings.forEach((v) => console.log(v));
}

async function backUpZReadings() {
    for (let i = 0; i < registersToFix.length; i++) {
        const { business, registerId, storeId, firstOrderCreateTime } = registersToFix[i];
        await backUpOneRegisterZReading(business, registerId, storeId, firstOrderCreateTime);
    }
}

export async function backUp() {
    await backUpZReadings();
}
