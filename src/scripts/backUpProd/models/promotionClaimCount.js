const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionClaimCountSchema = new Schema(
    {
        businessName: {
            type: String,
        },
        promotionId: {
            type: String,
            required: true,
        },
        promotionCode: {
            type: String,
        },
        consumerId: {
            type: String,
        },
        customerId: {
            type: String,
        },
        count: {
            type: Number,
            default: 0
        },
        receiptNumbers: {
            type: [String],
            default: [],
        },
        uniquePromotionCodeId: {
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

PromotionClaimCountSchema.index({ promotionId: 1, customerId: 1, consumerId: 1 });
module.exports = mongoose.model('PromotionClaimCount', PromotionClaimCountSchema);
