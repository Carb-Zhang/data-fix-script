"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionCustomerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PromotionCustomerSchema = new mongoose_1.Schema({
    promotionId: {
        type: String,
        required: true,
    },
    business: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    consumerId: {
        type: String,
    },
    promotionCode: {
        type: String,
    },
    restClaimCount: {
        type: Number,
        default: 0,
    },
    validFrom: {
        type: Date,
    },
    validTo: {
        type: Date,
    },
    status: {
        // enums: {'expired', 'active'}
        type: String,
    },
    rewardsSetId: {
        type: String,
    },
    rewardSettingId: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
    },
});
exports.PromotionCustomerSchema.index({ promotionId: 1, customerId: 1, consumerId: 1, status: 1 });
exports.PromotionCustomerSchema.index({ promotionCode: 1 });
exports.PromotionCustomerSchema.index({ validFrom: 1, validTo: 1 });
exports.PromotionCustomerSchema.index({ validTo: 1 });
exports.PromotionCustomerSchema.index({ business: 1, customerId: 1, validTo: 1 });
exports.PromotionCustomerSchema.index({ consumerId: 1, validTo: 1 });
const PromotionCustomerModel = (0, mongoose_1.model)('promotionCustomer', exports.PromotionCustomerSchema);
exports.default = PromotionCustomerModel;
