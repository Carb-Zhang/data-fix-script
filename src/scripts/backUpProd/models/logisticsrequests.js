const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogisticsRequestsSchema = new Schema(
    {
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
        isSendOnDemandRequest: {
            type: Boolean,
        },
        status: {
            type: String,
        },
        isPreOrder: {
            type: Boolean,
        },
        isCancelled : {
            type : Boolean
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

LogisticsRequestsSchema.index({ receiptNumber: 1 });
LogisticsRequestsSchema.index({ status: 1 }, { sparse: 1 });
LogisticsRequestsSchema.index({ time: 1, isSendOnDemandRequest: 1 }, { sparse: true });
LogisticsRequestsSchema.path('time').index({ expires: 60 * 60 * 24 * 7 });

module.exports = mongoose.model('LogisticsRequests', LogisticsRequestsSchema);
