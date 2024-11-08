'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const ShareInfoRequestSchema = new mongoose_1.Schema(
    {
        merchantName: {
            type: String,
            required: true,
        },
        expiredDate: {
            type: Date,
        },
        scannedDate: {
            type: Date,
        },
        source: {
            type: String,
        },
        consumerId: {
            type: String,
        },
        customerId: {
            type: String,
        },
        sharedInfoDate: {
            type: Date,
        },
        registerId: {
            type: String,
        },
        isNewCustomer: {
            type: Boolean,
        },
        storeId: {
            type: String,
        },
        employeeId: {
            type: String,
        },
        isNewMember: {
            type: Boolean,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);
ShareInfoRequestSchema.index({ merchantName: 1, registerId: 1 });
const ShareInfoRequestModel = (0, mongoose_1.model)('ShareInfoRequest', ShareInfoRequestSchema);
exports.default = ShareInfoRequestModel;
