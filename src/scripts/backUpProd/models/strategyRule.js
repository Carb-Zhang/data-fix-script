"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TimelineSchema = new mongoose_1.Schema({
    minutes: {
        type: Number,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
}, {
    _id: false,
});
const StrategyRuleSchema = new mongoose_1.Schema({
    timeline: {
        type: TimelineSchema,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    actionName: {
        type: String,
        required: true,
    },
    rideType: {
        type: String,
    },
    assignRideType: {
        type: String,
    },
    filterRideType: {
        type: String,
    },
    providerName: {
        type: String,
    },
    halal: {
        type: String,
    },
    isPreOrder: {
        type: Boolean,
    },
    deliveryRange: {
        type: [Number],
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
});
StrategyRuleSchema.index({ country: 1 });
const StrategyRuleModel = (0, mongoose_1.model)('StrategyRule', StrategyRuleSchema);
exports.default = StrategyRuleModel;
