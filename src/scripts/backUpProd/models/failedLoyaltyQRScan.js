const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FailedLoyaltyQRScanSchema = new Schema(
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
        reason: {
            type: String,
            enums: ['CLAIMED_BY_OTHER', 'QR_CODE_EXPIRED', 'REACH_DAY_LIMIT'],
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

FailedLoyaltyQRScanSchema.index({
    business: 1,
    customerId: 1,
    receiptNumber: 1,
});

module.exports = mongoose.model('FailedLoyaltyQRScan', FailedLoyaltyQRScanSchema);
