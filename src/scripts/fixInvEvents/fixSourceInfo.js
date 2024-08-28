import InventoryChangeEvent, {
    InventoryChangeEventType,
} from '../../models/inventoryChangeEvent.js';
import PurchaseOrder from '../../models/purchaseOrder.js';
import StockReturn from '../../models/stockReturn.js';
import StockTake from '../../models/stockTake.js';
import StockTransfer from '../../models/stockTransfer.js';
import TransactionRecord from '../../models/transactionRecord.js';
import { Types } from 'mongoose';

import { isOn } from './growthbook.js';
import _ from 'lodash';

const SourceInfoMap = {
    [InventoryChangeEventType.STOCK_PURCHASE]: async (business, sourceInfo) => {
        const { refId } = sourceInfo;
        const doc = await PurchaseOrder.findOne({ _id: new Types.ObjectId(refId) })
            .lean()
            .select({ completedBy: 1 });
        if (!doc) {
            return null;
        }
        return {
            refId,
            customFields: {
                employeeId: doc.completedBy || '',
            },
        };
    },
    [InventoryChangeEventType.STOCK_RETURN]: async (business, sourceInfo) => {
        const { refId } = sourceInfo;
        const doc = await StockReturn.findOne({ _id: new Types.ObjectId(refId) })
            .lean()
            .select({ completedBy: 1 });
        if (!doc) {
            return null;
        }
        return {
            refId,
            customFields: {
                employeeId: doc.completedBy || '',
            },
        };
    },
    [InventoryChangeEventType.STOCK_TAKE]: async (business, sourceInfo) => {
        const { refId } = sourceInfo;
        const doc = await StockTake.findOne({ _id: new Types.ObjectId(refId) })
            .lean()
            .select({ completedBy: 1 });
        if (!doc) {
            return null;
        }
        return {
            refId,
            customFields: {
                employeeId: doc.completedBy || '',
            },
        };
    },
    [InventoryChangeEventType.STOCK_TRANSFER]: async (business, sourceInfo) => {
        const { refId } = sourceInfo;
        const status = _.get(sourceInfo, 'customFields.status');
        const doc = await StockTransfer.findOne({ _id: new Types.ObjectId(refId) })
            .lean()
            .select({ receivedBy: 1, shippedBy: 1 });
        if (!doc) {
            return null;
        }
        return {
            refId,
            customFields: {
                status,
                employeeId: (status === 'completed' ? doc.receivedBy : doc.shippedBy) || '',
            },
        };
    },
    [InventoryChangeEventType.ORDER_OFFLINE_RESTOCK]: async (business, sourceInfo) => {
        const { refId } = sourceInfo;
        const doc = await TransactionRecord.findOne({ _id: new Types.ObjectId(refId) })
            .lean()
            .select({ receiptNumber: 1, employeeNumber: 1 });
        if (!doc) {
            return null;
        }
        return {
            refId,
            customFields: {
                receiptNumber: doc.receiptNumber,
                employeeId: doc.employeeNumber || '',
            },
        };
    },
    [InventoryChangeEventType.ORDER_OFFLINE_CANCEL]: async (business, sourceInfo) => {
        const receiptNumber = _.get(sourceInfo, 'customFields.receiptNumber');
        const registerId = _.get(sourceInfo, 'customFields.registerId');
        const doc = await TransactionRecord.findOne({ business, receiptNumber })
            .lean()
            .select({ _id: 1, employeeNumber: 1 });
        if (!doc) {
            return null;
        }
        return {
            refId: doc._id.toString(),
            customFields: {
                receiptNumber,
                employeeId: doc.employeeNumber || '',
                registerId,
            },
        };
    },
    [InventoryChangeEventType.ORDER_OFFLINE_PLACE]: async (business, sourceInfo) => {
        const receiptNumber = _.get(sourceInfo, 'customFields.receiptNumber');
        const registerId = _.get(sourceInfo, 'customFields.registerId');
        const doc = await TransactionRecord.findOne({ business, receiptNumber })
            .lean()
            .select({ _id: 1, employeeNumber: 1 });
        if (!doc) {
            return null;
        }
        return {
            refId: doc._id.toString(),
            customFields: {
                receiptNumber,
                employeeId: doc.employeeNumber || '',
                registerId,
            },
        };
    },
};

async function fixSourceInfo(doc) {
    const { _id, business, eventType, sourceInfo } = doc;
    if (_.get(sourceInfo, 'customFields.employeeId')) {
        return;
    }
    if (!isOn(business)) {
        return;
    }
    const newSourceInfo = await SourceInfoMap[eventType](business, sourceInfo);
    if (!newSourceInfo) {
        return;
    }
    await InventoryChangeEvent.default.updateOne(
        { _id },
        {
            $set: {
                sourceInfo: newSourceInfo,
            },
        },
        {
            timestamps: false,
        },
    );
}

const START_AT = new Date('2024-02-29T00:00:00.000+08:00');
const START_END = new Date('2024-05-16T00:00:00.000+08:00');
const EVENT_TYPES = [
    InventoryChangeEventType.STOCK_PURCHASE,
    InventoryChangeEventType.STOCK_RETURN,
    InventoryChangeEventType.STOCK_TAKE,
    InventoryChangeEventType.STOCK_TRANSFER,
    InventoryChangeEventType.ORDER_OFFLINE_RESTOCK,
    InventoryChangeEventType.ORDER_OFFLINE_CANCEL,
    InventoryChangeEventType.ORDER_OFFLINE_PLACE,
];

export async function fixEventSourceInfo() {
    const filter = {
        eventType: { $in: EVENT_TYPES },
        createdAt: { $gt: START_AT, $lt: START_END },
        business: 'happyday_2019',
    };

    await InventoryChangeEvent.default
        .find(filter)
        .sort({ createdAt: 1 })
        .select({ _id: 1, sourceInfo: 1, eventType: 1, business: 1 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(fixSourceInfo);
}
