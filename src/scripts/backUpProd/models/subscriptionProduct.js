// Simplified version of subscriptionProduct schema, just for executing a script to initialize the data
const mongoose = require ('mongoose');
const {Schema, Document} = mongoose;

const SubscriptionProductSchema = new Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        productType: {
            type: String,
            required: true,
        },
        currencyCode: {
            type: String,
            required: true,
        },
        status: {
            type: String,
        },
        period: {
            type: Number,
        },
        periodUnit: {
            type: String,
        },
        createdAt: {
            type: Number,
        },
        updatedAt: {
            type: Number,
        },
        resourceVersion: {
            type: Number,
        },
        unitPrice: {
            type: Number,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        strict: true,
    },
);

module.exports = mongoose.model(
    'SubscriptionProduct',
    SubscriptionProductSchema,
);
