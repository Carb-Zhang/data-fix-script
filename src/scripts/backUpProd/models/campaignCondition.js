"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignConditionSchema = exports.OutputSchema = exports.FilterSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FilterSchema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    valueString: {
        type: [String],
    },
    valueBoolean: {
        type: [Boolean],
    },
    valueNumber: {
        type: [Number],
    },
});
exports.OutputSchema = new mongoose_1.Schema({
    delay: {
        type: Number,
    },
    channel: {
        type: String,
    },
    outputValidations: {
        type: [String],
    },
});
exports.CampaignConditionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    filters: {
        type: [exports.FilterSchema],
    },
    output: {
        type: exports.OutputSchema,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.CampaignConditionSchema.index({ type: 1 });
const CampaignConditionModel = (0, mongoose_1.model)('campaignCondition', exports.CampaignConditionSchema);
exports.default = CampaignConditionModel;
