"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentIntent = new mongoose_1.Schema({
    business: {
        type: String,
    },
    storeId: {
        type: String,
    },
    receiptNumber: {
        type: String,
        required: true,
    },
    incrId: {
        type: Number,
        default: 0,
    },
    paymentRecordId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    notificationACK: {
        type: Boolean,
        default: false,
    },
    source: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Success', 'Pending', 'Void', 'Failed'],
        default: 'Pending',
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});
const PaymentIntentModel = (0, mongoose_1.model)('PaymentIntent', PaymentIntent);
exports.default = PaymentIntentModel;
