const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransactionAdditionalInfoSchema = new Schema(
    {
        source: {
            type: String,
            required: true,
        },
        businessName: {
            type: String,
            required: true,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
    },
);

const AppNotification = new Schema(
    {
        receiver: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            default: 'unread',
            enum: ['read', 'unread'],
        },
        type: {
            type: String,
            required: true,
            enum: ['transaction'],
        },
        // TransactionAdditionalInfoSchema
        additionalInfo: {
            type: Schema.Types.Mixed,
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

module.exports = mongoose.model('appNotification', AppNotification);
