"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentRecord = new mongoose_1.Schema({
    receiptNumber: {
        type: String,
        required: true,
    },
    paymentRecordId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    refundId: {
        type: String,
    },
    refundRequestId: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    providerAccountId: {
        type: String,
    },
    providerOption: {
        type: String,
    },
    business: {
        type: String,
    },
    storeId: {
        type: String,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    notificationACK: {
        type: Boolean,
    },
    source: {
        type: String,
    },
    lastErrorCode: {
        type: String,
    },
    lastError: {
        type: String,
    },
    isInternal: { type: Boolean },
    issuerCountry: { type: String },
    issuerName: { type: String },
    cardType: { type: String },
    cancelledAt: {
        type: Date,
    },
    nonce: {
        type: String,
    },
    redirectURL: {
        type: String,
    },
    webhookURL: {
        type: String,
    },
    paymentOption: {
        type: String,
    },
    userId: {
        type: String,
    },
    cardToken: {
        type: String,
    },
    cvcToken: {
        type: String,
    },
    paymentMethodId: {
        type: String,
    },
    payActionWay: {
        type: String,
    },
    cardholderName: {
        type: String,
    },
    encryptedCardInfo: {
        type: String,
    },
    paymentType: {
        type: String,
    },
    shippingtype: {
        type: String,
    },
    metadata: {
        type: mongoose_1.Schema.Types.Mixed,
    },
}, {
    autoIndex: process.env.NODE_ENV !== 'production',
    timestamps: true,
});
PaymentRecord.index({ receiptNumber: 1 });
PaymentRecord.index({ paymentRecordId: 1 });
PaymentRecord.index({ provider: 1, providerAccountId: 1 });
PaymentRecord.index({ providerOption: 1 });
PaymentRecord.index({ status: 1 });
PaymentRecord.index({ source: 1 }, {
    sparse: true,
});
PaymentRecord.index({
    paymentId: 1,
}, {
    sparse: true,
});
PaymentRecord.index({
    cancelledAt: 1,
}, {
    sparse: true,
});
PaymentRecord.index({
    issuerCountry: 1,
}, {
    sparse: true,
});
const PaymentRecordModel = (0, mongoose_1.model)('PaymentRecord', PaymentRecord);
exports.default = PaymentRecordModel;
