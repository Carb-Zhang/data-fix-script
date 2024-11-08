"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignSegmentSchema = exports.NestedSchema = exports.FilterSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FilterSchema = new mongoose_1.Schema({
    key: {
        type: String,
    },
    condition: {
        type: String,
    },
    valueNumber: {
        type: String,
    },
    valueString: {
        type: String,
    },
    valueDate: {
        type: Date,
    },
    symbol: {
        type: String,
    },
    funcName: {
        type: String,
    },
    segmentRuleType: {
        type: String,
    },
    defaultComparedValue: {
        type: String,
    },
});
exports.NestedSchema = new mongoose_1.Schema({
    source: {
        type: String,
        required: true,
    },
    groupBys: {
        type: [String],
    },
    filters: {
        type: [exports.FilterSchema],
    },
});
exports.CampaignSegmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    business: {
        type: String,
    },
    nestedSource: {
        type: exports.NestedSchema,
    },
    filters: {
        type: [exports.FilterSchema],
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.CampaignSegmentSchema.index({ name: 1, business: 1 }, { unique: true });
const CampaignSegmentModel = (0, mongoose_1.model)('campaignSegment', exports.CampaignSegmentSchema);
exports.default = CampaignSegmentModel;
