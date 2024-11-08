const mongoose = require('mongoose');
const { SubscriptionOrderStatus, SubscriptionOrderAction } = require('./subscriptionOrder');
const Schema = mongoose.Schema;

const SubscriptionOrderSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: SubscriptionOrderStatus,
            required: true,
        },
        action: {
            type: String,
            enum: SubscriptionOrderAction,
            required: true,
        },
        planId: {
            type: String,
        },
        addons: [
            {
                _id: false,
                id: {
                    type: String,
                },
                count: {
                    type: Number,
                },
            },
            ,
        ],
        numberOfRenewals: {
            type: Number,
        },
        paymentGateway: {
            type: String,
        },
        paymentMethod: {
            type: String,
        },
        paymentId: {
            type: String,
        },
        paymentProvider: {
            type: String,
        },
        errorCode: {
            type: String,
        },
        outdated: {
            type: Boolean,
        },
        shortId: {
            type: String,
        },
        orderType: {
            type: String,
            enums: ['sms', 'plan'],
        },
        taxAmount: {
            type: Number,
        },
        discountAmount: {
            type: Number,
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    },
);

SubscriptionOrderSchema.index({ business: 1 });

module.exports = mongoose.model('SubscriptionOrder', SubscriptionOrderSchema);
