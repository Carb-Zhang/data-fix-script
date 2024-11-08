"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GatewayRecordSchema = new mongoose_1.Schema({
    receiptNumber: {
        type: String,
    },
    paymentGateway: {
        type: String,
    },
    transactionId: {
        type: String,
    },
    fee: {
        type: Number,
    },
    transactionAmount: {
        type: Number,
    },
    net: {
        type: Number,
    },
    transferStatus: {
        type: String,
    },
    settlementTime: {
        type: Date,
    },
    country: {
        type: String,
    },
    transactionType: {
        type: String,
    },
    reconStatus: {
        type: String,
        required: true,
    },
    paymentRecordId: {
        type: String,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
GatewayRecordSchema.index({
    transactionId: 1,
});
const GatewayRecordModel = (0, mongoose_1.model)('GatewayRecord', GatewayRecordSchema);
exports.default = GatewayRecordModel;
