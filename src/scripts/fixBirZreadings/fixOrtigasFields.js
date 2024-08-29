import ZReadingModel from '../../models/zReading.js';
import TransactionRecord from '../../models/transactionRecord.js';

import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

const ENUMS = {
    BIRFixedTaxRate: 0.12,
};

async function getOfflineAggrResult(zReading) {
    const { closeTime, business, registerId, storeId } = zReading;
    var filter = {
        business,
        createdTime: { $lt: closeTime },
        registerId: new ObjectId(registerId),
        storeId: new ObjectId(storeId),
        transactionType: { $ne: 'PreOrder' },
    };
    const res = await TransactionRecord.aggregate([
        {
            $match: filter,
        },
        {
            $project: {
                taxableSales: {
                    $cond: [{ $eq: ['$isCancelled', false] }, '$taxableSales', 0],
                },
                voidAmount: {
                    $cond: [
                        { $eq: ['$isCancelled', true] },
                        {
                            $subtract: [
                                { $ifNull: ['$total', 0] },
                                {
                                    $add: [
                                        { $ifNull: ['$serviceCharge', 0] },
                                        { $ifNull: ['$serviceChargeTax', 0] },
                                        { $ifNull: ['$roundedAmount', 0] },
                                    ],
                                },
                            ],
                        },
                        0,
                    ],
                },
                voidTaxableSales: {
                    $cond: [{ $eq: ['$isCancelled', true] }, '$taxableSales', 0],
                },
                voidTrxCount: {
                    $cond: [{ $eq: ['$isCancelled', true] }, 1, 0],
                },
                customerCount: {
                    $cond: [{ $eq: ['$isCancelled', false] }, '$pax', 0],
                },
                discountedTrxCount: {
                    $cond: [
                        {
                            $and: [{ $eq: ['$isCancelled', false] }, { $ne: ['$discount', 0] }],
                        },
                        1,
                        0,
                    ],
                },
            },
        },
        {
            $group: {
                _id: '$transactionType',
                taxableSales: { $sum: '$taxableSales' },
                voidAmount: { $sum: '$voidAmount' },
                voidTaxableSales: { $sum: '$voidTaxableSales' },
                voidTrxCount: { $sum: '$voidTrxCount' },
                customerCount: { $sum: '$customerCount' },
                discountedTrxCount: { $sum: '$discountedTrxCount' },
            },
        },
    ]);
    const transactions = {
        Return: {},
        Sale: {},
    };
    for (let i = 0; i < res.length; i++) {
        const { _id: transactionType } = res[i];
        transactions[transactionType] = res[i];
    }

    return {
        vatableRefundAmount:
            (transactions['Return'].taxableSales || 0) * (1 + ENUMS.BIRFixedTaxRate),
        vatExemptRefundAmount:
            zReading.refundAmount -
            (transactions['Return'].taxableSales || 0) * (1 + ENUMS.BIRFixedTaxRate),
        voidAmount: transactions['Sale'].voidAmount || 0,
        vatableVoidAmount:
            (transactions['Sale'].voidTaxableSales || 0) * (1 + ENUMS.BIRFixedTaxRate),
        vatExemptVoidAmount:
            (transactions['Sale'].voidAmount || 0) -
            (transactions['Sale'].voidTaxableSales || 0) * (1 + ENUMS.BIRFixedTaxRate),
        customerCount: transactions['Sale'].customerCount || 0,
        voidTrxCount: transactions['Sale'].voidTrxCount || 0,
        discountedTrxCount: transactions['Sale'].discountedTrxCount || 0,
    };
}

async function fixOrtigasFieldsForOne(doc) {
    const { _id, extendedInfoForMall } = doc;

    const fixedFields = await getOfflineAggrResult(doc);
    for (const key in fixedFields) {
        extendedInfoForMall[key] += fixedFields[key];
    }
    await ZReadingModel.updateOne({ _id }, { $set: { extendedInfoForMall } });
}

export async function fixOrtigasFields() {
    await ZReadingModel.find({
        zCount: 1,
        'extendedInfoForMall.discountedTrxCount': { $exists: true },
        zStartTime: { $exists: false },
    })
        .sort({ _id: 1 })
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(fixOrtigasFieldsForOne);
}
