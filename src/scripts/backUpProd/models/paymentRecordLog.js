"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRecordModel = exports.PaymentRecordLogSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PaymentRecordLogSchema = new mongoose_1.Schema({
    receiptNumber: {
        type: String,
        required: true,
    },
    paymentRecordId: {
        type: String,
        required: true,
    },
    logTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
    },
    source: {
        type: String,
    },
    operator: {
        type: String,
    },
    remark: {
        type: String,
    },
    metadata: {
        type: mongoose_1.Schema.Types.Mixed,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.PaymentRecordLogSchema.index({ receiptNumber: 1, paymentRecordId: 1 });
exports.PaymentRecordModel = (0, mongoose_1.model)('paymentRecordLog', exports.PaymentRecordLogSchema);
exports.default = exports.PaymentRecordModel;
