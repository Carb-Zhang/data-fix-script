"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.StoreReviewSchema = new mongoose_1.Schema({
    business: {
        type: String,
        required: true,
    },
    receiptNumber: {
        type: String,
        required: true,
    },
    storeId: {
        type: String,
        required: true,
    },
    placeId: {
        type: String,
    },
    rating: {
        type: Number,
    },
    comments: {
        type: String,
    },
    allowMerchantContact: {
        type: Boolean,
    },
    contactName: {
        type: String,
    },
    contactPhone: {
        type: String,
    },
    clickCount: {
        type: Number,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.StoreReviewSchema.index({ business: 1, createdTime: -1, storeId: 1, rating: 1 });
exports.StoreReviewSchema.index({ receiptNumber: 1 }, { unique: true });
exports.StoreReviewSchema.index({ storeId: 1 });
const StoreReviewModel = (0, mongoose_1.model)('StoreReview', exports.StoreReviewSchema);
exports.default = StoreReviewModel;
