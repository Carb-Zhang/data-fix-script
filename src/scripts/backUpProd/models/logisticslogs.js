const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const LogisticsLogsSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        operationType: {
            type: String,
        },
        operatorName: {
            type: String,
        },
        body: {
            type: Mixed,
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
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

LogisticsLogsSchema.index({ receiptNumber: 1, name: 1, id: 1 });
LogisticsLogsSchema.index({ receiptNumber: 1, status: 1, time: 1 });
LogisticsLogsSchema.index({ time: 1 });
LogisticsLogsSchema.path('time').index({ expires: 60 * 60 * 24 * 30 * 6 });

module.exports = mongoose.model('LogisticsLogs', LogisticsLogsSchema);
