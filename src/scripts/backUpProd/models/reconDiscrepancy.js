"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReconDiscrepancyPayoutItemSchema = new mongoose_1.Schema({
    paidAmount: {
        type: Number,
        required: true,
    },
    payoutType: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
        required: true,
    },
    settledAt: {
        type: Date,
        required: true,
    },
});
const ReconDiscrepancyGatewayRecordSchema = new mongoose_1.Schema({
    transactionAmount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    settlementTime: {
        type: Date,
        required: true,
    },
});
const ReconDiscrepancyLogSchema = new mongoose_1.Schema({
    event: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    payoutItems: {
        type: [ReconDiscrepancyPayoutItemSchema],
    },
    gatewayRecords: {
        type: [ReconDiscrepancyGatewayRecordSchema],
    },
});
const ReconDiscrepancySchema = new mongoose_1.Schema({
    discrepancyType: {
        type: String,
        required: true,
    },
    receiptNumber: {
        type: String,
        required: true,
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false,
    },
    logs: {
        type: [ReconDiscrepancyLogSchema],
        required: true,
    },
}, {
    autoIndex: process.env.NODE_ENV === 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
ReconDiscrepancySchema.index({
    discrepancyType: 1,
    receiptNumber: 1,
    isResolved: 1,
});
const ReconDiscrepancyModel = (0, mongoose_1.model)('ReconDiscrepancy', ReconDiscrepancySchema);
exports.default = ReconDiscrepancyModel;
