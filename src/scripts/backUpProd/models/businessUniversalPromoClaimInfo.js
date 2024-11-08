/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessUniversalPromoClaimInfoSchema = new Schema(
    {
        claimedBusiness: {
            type: String,
            required: true,
        },
        promoBusiness: {
            type: String,
            required: true,
        },
        promotionId: {
            type: String,
            required: true,
        },
        promotionCode: {
            type: String,
        },
        count: {
            type: Number,
            default: 0
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

BusinessUniversalPromoClaimInfoSchema.index({ promotionId: 1, claimedBusiness: 1 });
module.exports = mongoose.model('BusinessUniversalPromoClaimInfo', BusinessUniversalPromoClaimInfoSchema);
