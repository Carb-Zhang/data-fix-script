const mongoose = require('mongoose');

const PendingLoyaltyQRScanSchema = new mongoose.Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        processed: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'createdTime',
        },
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

PendingLoyaltyQRScanSchema.index({ businessName: 1, receiptNumber: 1 }, { unique: true });
PendingLoyaltyQRScanSchema.index({ businessName: 1, customerId: 1, processed: 1 });
module.exports = mongoose.model('PendingLoyaltyQRScan', PendingLoyaltyQRScanSchema);
