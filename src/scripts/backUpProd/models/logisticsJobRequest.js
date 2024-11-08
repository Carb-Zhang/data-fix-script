"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LogisticsRequestSchema = new mongoose_1.Schema({
    receiptNumber: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    isPreOrder: {
        type: Boolean,
    },
    isCancelled: {
        type: Boolean,
    },
    isSendOnDemandRequest: {
        type: Boolean,
    },
    status: {
        type: String,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
LogisticsRequestSchema.index({ receiptNumber: 1 });
LogisticsRequestSchema.index({ status: 1 }, { sparse: true });
LogisticsRequestSchema.index({ time: 1, isSendOnDemandRequest: 1 }, { sparse: true });
LogisticsRequestSchema.path('time').index({ expires: 60 * 60 * 24 * 7 });
const LogisticsRequestModel = (0, mongoose_1.model)('LogisticsJobRequest', LogisticsRequestSchema);
exports.default = LogisticsRequestModel;
