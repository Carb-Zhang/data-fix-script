const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PendingCashbackLogSchema = new Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        defaultLoyaltyRatio: {
            type: Number,
            required: true,
        },
        source: {
            type: String,
            enum: ['REGISTER', 'RECEIPT', 'QR_ORDERING', 'ECOMMERCE'],
            required: true,
        },
        eventTime: {
            type: Date,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

PendingCashbackLogSchema.index(
    {
        businessName: 1,
        receiptNumber: 1,
    },
    { unique: true },
);

module.exports = mongoose.model('PendingCashbackLog', PendingCashbackLogSchema);
