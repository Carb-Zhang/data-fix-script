'use strict';
exports.__esModule = true;
var mongoose_1 = require('mongoose');
var PointInfoSchema = new mongoose_1.Schema({
    pointId: {
        type: String,
        required: true,
    },
    changeAmount: {
        type: Number,
        required: true,
    },
});
var ExtraInfoSchema = new mongoose_1.Schema({
    isOnline: {
        type: Boolean,
    },
    receiptNumber: {
        type: String,
    },
    employeeId: {
        type: String,
    },
    notes: {
        type: String,
    },
});
var PointChangeLogSchema = new mongoose_1.Schema(
    {
        merchantName: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        changeAmount: {
            type: Number,
            required: true,
        },
        eventTime: {
            type: Date,
            required: true,
        },
        points: [PointInfoSchema],
        extraInfo: ExtraInfoSchema,
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);
PointChangeLogSchema.index({ merchantName: 1, customerId: 1, type: 1, eventTime: 1 });
var PointChangeLogModel = (0, mongoose_1.model)('PointChangeLog', PointChangeLogSchema);
exports['default'] = PointChangeLogModel;
