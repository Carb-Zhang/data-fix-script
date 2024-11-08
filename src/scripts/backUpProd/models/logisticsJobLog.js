"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LogisticsJobLogSchema = new mongoose_1.Schema({
    jobId: {
        type: String,
        required: true,
    },
    providerName: {
        type: String,
        required: true,
    },
    receiptNumber: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Date,
        required: true,
    },
    operation: {
        type: String,
    },
    operator: {
        type: String,
    },
    operatorName: {
        type: String,
    },
    status: {
        type: String,
    },
    rideType: {
        type: String,
    },
    deliveryFee: {
        type: Number,
    },
    deliveryDistance: {
        type: Number,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
});
LogisticsJobLogSchema.index({ receiptNumber: 1, providerName: 1, jobId: 1 });
LogisticsJobLogSchema.index({ receiptNumber: 1, status: 1, createdTime: 1 });
LogisticsJobLogSchema.index({ createdTime: 1 });
LogisticsJobLogSchema.path('createdTime').index({ expires: 60 * 60 * 24 * 30 * 6 });
const JobLogModel = (0, mongoose_1.model)('LogisticsJobLogs', LogisticsJobLogSchema);
exports.default = JobLogModel;
