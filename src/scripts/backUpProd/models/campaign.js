"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignSchema = void 0;
const mongoose_1 = require("mongoose");
const campaignPromotion_1 = require("./campaignPromotion");
exports.CampaignSchema = new mongoose_1.Schema({
    campaignType: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    business: {
        type: String,
        required: true,
    },
    brandName: {
        type: String,
    },
    cron: {
        type: String,
    },
    delay: {
        type: Number,
    },
    channel: {
        type: String,
        required: true,
    },
    initialSegmentId: {
        type: String,
    },
    segmentId: {
        type: String,
    },
    conditionType: {
        type: String,
        enum: ['TRANSACTION', 'NO_SMS_SENT', null],
        default: null,
    },
    template: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'DRAFT',
        enum: ['DRAFT', 'ACTIVE', 'SUSPENDED', 'PAUSED', 'FINISHED'],
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    isInitial: {
        type: Boolean,
        default: true,
    },
    cronJobKey: {
        type: String,
    },
    promotion: campaignPromotion_1.CampaignPromotionSchema,
    timezone: {
        type: String,
    },
    globalCampaignInformationId: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    selectedTemplateLanguage: {
        type: String,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.CampaignSchema.index({ business: 1, name: 1 }, { unique: true });
exports.CampaignSchema.index({ business: 1, conditionType: 1 }, { sparse: true });
exports.CampaignSchema.index({ channel: 1 });
exports.CampaignSchema.index({ cron: 1 });
exports.CampaignSchema.index({ 'promotion.promotionId': 1 });
const CampaignModel = (0, mongoose_1.model)('campaign', exports.CampaignSchema);
exports.default = CampaignModel;
