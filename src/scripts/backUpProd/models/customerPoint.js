"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerPointSchema = new mongoose_1.Schema({
    merchantName: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    pointRate: {
        type: Number
    },
    total: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date
    },
    source: {
        type: String,
        required: true
    },
    sourceRefId: {
        type: String
    }
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime'
    }
});
CustomerPointSchema.index({ merchantName: 1, customerId: 1, expiryDate: 1, balance: 1 });
CustomerPointSchema.index({ merchantName: 1, sourceRefId: 1 }, { unique: true, partialFilterExpression: { sourceRefId: { $type: 'string' } } });
CustomerPointSchema.index({ expiryDate: 1, balance: 1 });
const CustomerPointModel = (0, mongoose_1.model)('CustomerPoint', CustomerPointSchema);
exports.default = CustomerPointModel;
