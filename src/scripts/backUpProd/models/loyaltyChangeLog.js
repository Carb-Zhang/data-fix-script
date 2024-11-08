/**
 * Created with JetBrains WebStorm.
 * User: z
 * Date: 4/2/14
 * Time: 9:52 AM
 * To change this template use File | Settings | File Templates.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const LoyaltyChangeLogSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        eventTime: {
            type: Date,
            required: true,
        },

        eventType: {
            type: String,
            require: true,
            enum: [
                'earned',
                'expense',
                /**
                 * for beep orders with cashback, create orders, and then deduct customers' cashback
                 */
                'expense_freeze',
                /**
                 * for beep orders with cashback,
                 * 1. receive webhook after payment cancelled automatically
                 * 2. customers paid orders after payment cancelled automatically
                 */
                'expense_refreeze',
                'return',
                'transactionCancelled',
                'transactionCancelled_Refund',
                /**
                 * for beep orders with cashback,
                 * payment cancelled automatically, before customers paid successfully.
                 */
                'paymentCancelled_freezeRefund',
                'refundAsLoyalty',
                'imported',
                'empty',
                'expired',
                'adjustment'
            ],
        },

        //amount can be either positive or negative depends on whether it's earning or consuming the loyalty
        amount: {
            type: Number,
            required: true,
        },
        transactionId: {
            type: String,
        },
        receiptNumber: {
            type: String,
        },

        //the field is product ObjectId string, the value is the loyalty earned/returned per product in the transaction
        //if there're multiple quantity of the products in the transaction, it's the average earned/returned loyalty per each
        //loyalty per product is always positive no matter it's earning the loyalty or deduct the loyalty (e.g. due to returns)
        loyaltyPerProduct: {
            type: Mixed,
        },
        defaultLoyaltyRatio: {
            type: Number,
        },
        dataVersion: {
            type: Number,
        },
        source: {
            type: String,
            enum: ['REGISTER', 'RECEIPT', 'QR_ORDERING', 'ECOMMERCE'],
        },
        rewardType: {
            type: String,
            default: 'default',
            enum: ['default', 'cashback'],
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

LoyaltyChangeLogSchema.index({
    business: 1,
    customerId: 1,
    eventTime: -1,
    amount: 1,
});

LoyaltyChangeLogSchema.index(
    {
        business: 1,
        receiptNumber: 1,
        eventType: 1,
    },
    { unique: true, partialFilterExpression: { receiptNumber: { $exists: true } } },
);

LoyaltyChangeLogSchema.index({
    business: 1,
    customerId: 1,
    eventTime: -1,
});

module.exports = mongoose.model('LoyaltyChangeLog', LoyaltyChangeLogSchema);
