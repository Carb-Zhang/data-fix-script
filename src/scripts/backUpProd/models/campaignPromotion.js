"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignPromotionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CampaignPromotionSchema = new mongoose_1.Schema({
    promotionId: {
        type: String,
        required: true,
    },
    customerClaimCount: {
        type: Number,
        required: true,
    },
    validDuration: {
        type: Number,
    },
});
