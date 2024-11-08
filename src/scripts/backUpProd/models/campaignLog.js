"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CampaignLogSchema = new mongoose_1.Schema({
    campaignId: {
        type: String,
        required: true,
    },
    business: {
        type: String,
    },
    operation: {
        type: String,
    },
    status: {
        type: String,
    },
    reason: {
        type: String,
    },
    additionalLogData: {
        creditsDueForDeduction: {
            type: Number,
        },
        creditsActualDeducted: {
            type: Number,
        },
        customerCount: {
            type: Number,
        },
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
CampaignLogSchema.index({ campaignId: 1 });
CampaignLogSchema.index({ business: 1 });
CampaignLogSchema.path('createdTime').index({ expires: 60 * 60 * 24 * 30 * 6 });
const CampaignLogModel = (0, mongoose_1.model)('CampaignLog', CampaignLogSchema);
exports.default = CampaignLogModel;
