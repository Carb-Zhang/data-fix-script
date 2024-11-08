"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignInformationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CampaignInformationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    business: {
        type: String,
    },
    images: {
        type: [String],
    },
    campaignType: {
        // DYNAMIC, STATIC_FEEDBACK
        type: String,
    },
    campaignId: {
        type: String,
    },
    customerReachedCount: {
        type: Number,
    },
    segmentRuleTypes: {
        type: [String],
    },
    validations: {
        type: [String],
    },
    defaultSMSTemplate: {
        type: String,
    },
    SMSTemplateEN: {
        type: String,
    },
    SMSTemplateMS: {
        type: String,
    },
    SMSTemplateTH: {
        type: String,
    },
    SMSTemplatePH: {
        type: String,
    },
    initialRun: {
        type: Boolean,
    },
    requiredEtaCheck: {
        type: Boolean,
    },
    order: {
        type: Number,
    },
    originalId: {
        type: String,
    },
    smsUnitCredits: {
        type: Number,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.CampaignInformationSchema.index({ business: 1, name: 1 }, { unique: true });
const CampaignInformationModel = (0, mongoose_1.model)('CampaignInformation', exports.CampaignInformationSchema);
exports.default = CampaignInformationModel;
