"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsSetSchema = void 0;
const mongoose_1 = require("mongoose");
const PromotionConfigSchema = new mongoose_1.Schema({
    promotionId: {
        type: String,
        required: true,
    },
    validNumber: {
        type: Number,
    },
    // days, week
    validUnit: {
        type: String,
    },
});
exports.RewardsSetSchema = new mongoose_1.Schema({
    business: {
        type: String,
        required: true,
    },
    // generality, welcomeNewMembership
    type: {
        type: String,
        required: true,
    },
    promotionConfigs: {
        type: [PromotionConfigSchema],
    },
    isEnabled: {
        type: Boolean,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'updatedTime',
    },
});
exports.RewardsSetSchema.index({ business: 1, type: 1 });
const RewardsSetModel = (0, mongoose_1.model)('rewardsSet', exports.RewardsSetSchema);
exports.default = RewardsSetModel;
