const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FeedBackSchema = new Schema(
    {
        reasonCode: {
            type: [String],
        },
        notes: {
            type: String,
        },
        // merchant, consumer
        reporterType: {
            type: String,
        },
        logisticsProvider: {
            type: String,
        },
        receiptNumber: {
            type: String,
        },
        // 1: In Process, 2: Complete
        status: {
            type: Number,
        },

        image: {
            type: String,
        },
        email: {
          type: String,
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

FeedBackSchema.index({ receiptNumber: 1 }, { unique: true });

module.exports = mongoose.model('FeedBack', FeedBackSchema);
