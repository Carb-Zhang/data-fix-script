"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CreditCard = new mongoose_1.Schema({
    maskedNumber: {
        type: String,
        required: true,
    },
    cardholderName: {
        type: String,
    },
    expirationMonth: {
        type: String,
        required: true,
    },
    expirationYear: {
        type: String,
        required: true,
    },
    cardType: {
        type: String,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
const PaymentMethod = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    cardInfo: {
        type: CreditCard,
    },
    cardToken: {
        type: String,
        required: true,
    },
    bindedReceiptNumber: {
        type: String,
        required: true,
    },
    uniqueIdentifier: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Success', 'Pending', 'Deleted'],
        default: 'Pending',
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});
PaymentMethod.index({ userId: 1 });
PaymentMethod.index({ provider: 1 });
PaymentMethod.index({ status: 1 });
PaymentMethod.index({ bindedReceiptNumber: 1 });
PaymentMethod.index({ userId: 1, country: 1, uniqueIdentifier: 1 }, { unique: true });
PaymentMethod.index({ userId: 1, country: 1, provider: 1, status: 1 });
const PaymentMethodModel = (0, mongoose_1.model)('PaymentMethod', PaymentMethod);
exports.default = PaymentMethodModel;
