"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GatewayRetrieveLogSchema = new mongoose_1.Schema({
    paymentGateway: {
        type: String,
    },
    retrievedFrom: {
        type: Number,
    },
    retrievedTo: {
        type: Number,
    },
    files: {
        type: [String],
    },
    country: {
        type: String,
    },
    recordCount: {
        type: Number,
    },
    logType: {
        type: String,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
const GatewayRetrieveLogModel = (0, mongoose_1.model)('GatewayRetrieveLog', GatewayRetrieveLogSchema);
exports.default = GatewayRetrieveLogModel;
