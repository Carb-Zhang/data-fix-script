const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionStatisticsSchema = new Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
        isCancelled: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createTime',
            updatedAt: 'updateTime',
        },
    },
);

TransactionStatisticsSchema.index(
    {
        businessName: 1,
        receiptNumber: 1,
    },
    { unique: true },
);

module.exports = mongoose.model('TransactionStatistics', TransactionStatisticsSchema);
