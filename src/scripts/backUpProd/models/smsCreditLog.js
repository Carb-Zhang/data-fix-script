"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsCreditLogSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SmsCreditLogSchema = new mongoose_1.Schema({
    business: {
        type: String,
        required: true,
    },
    smsCreditChange: Number,
    lockedSmsCreditsChange: Number,
    smsCreditsBalance: Number,
    //lock,spend,refund,top-up
    eventType: String,
    source: String,
    title: String,
    country: String,
    smsCreditsAvgCost: Number,
    eventTime: Date,
    extraInfo: {
        purchasedId: String,
        smsCount: Number,
        campaignName: String,
        campaignId: String,
        campaignJobLaunchId: String,
        campaignJobId: String,
        ticketId: String,
        currency: String,
        paidAmount: Number,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.SmsCreditLogSchema.index({ business: 1 });
const SmsCreditLogModel = (0, mongoose_1.model)('smsCreditLog', exports.SmsCreditLogSchema);
exports.default = SmsCreditLogModel;
