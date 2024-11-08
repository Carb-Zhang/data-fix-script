"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignModel = exports.CampaignJobSchema = exports.AdditionalAttributesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AdditionalAttributesSchema = new mongoose_1.Schema({
    receiptNumber: {
        type: String,
    },
});
exports.CampaignJobSchema = new mongoose_1.Schema({
    business: {
        type: String,
        required: true,
    },
    campaignId: {
        type: String,
        required: true,
    },
    launchId: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
    },
    consumerId: {
        type: String,
    },
    customerPhone: {
        type: String,
    },
    customerEmail: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    pushStatus: {
        type: String,
        required: true,
    },
    failedReason: {
        type: String,
    },
    promotionCustomerId: {
        type: String,
    },
    attributes: {
        type: Object,
    },
    sendTime: {
        type: Date,
    },
    smsUnitCredits: {
        type: Number,
    },
    messageId: {
        type: String,
    },
    messageStatus: {
        type: String,
    },
    messageAmount: {
        type: Number,
    },
    messageUnits: {
        type: Number,
    },
    messageProvider: {
        type: String,
    },
    globalCampaignInformationId: {
        type: String,
    },
    delay: {
        type: Number,
    },
    validations: {
        type: [String],
    },
    additionalAttributes: {
        type: exports.AdditionalAttributesSchema,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.CampaignJobSchema.index({ business: 1, campaignId: 1, customerPhone: 1 });
exports.CampaignModel = (0, mongoose_1.model)('campaignJob', exports.CampaignJobSchema);
exports.default = exports.CampaignModel;
