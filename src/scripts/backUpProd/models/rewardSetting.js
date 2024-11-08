"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RewardSettingSchema = new mongoose_1.Schema({
    merchantName: { type: String, required: true },
    rewardSource: { type: String, required: true },
    rewardGroupId: String,
    rewardType: String,
    rewardRefId: String,
    validPeriod: Number,
    validPeriodUnit: String,
    isDeleted: Boolean,
    isEnabled: Boolean,
    costOfPoints: Number,
    tierLevel: Number,
}, {
    autoIndex: process.env.NODE_ENV !== 'production',
    timestamps: {
        updatedAt: 'modifiedTime',
        createdAt: 'createdTime',
    },
});
RewardSettingSchema.index({ merchantName: 1, rewardSource: 1 });
RewardSettingSchema.index({ rewardGroupId: 1 }, {
    partialFilterExpression: { rewardGroupId: { $exists: true } },
});
const RewardSettingModel = (0, mongoose_1.model)('rewardSetting', RewardSettingSchema);
exports.default = RewardSettingModel;
