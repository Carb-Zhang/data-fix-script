"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConsumerFavoriteStoreSchema = new mongoose_1.Schema({
    consumerId: {
        type: String,
        required: true,
    },
    business: {
        type: String,
        required: true,
    },
    storeId: {
        type: String,
        required: true,
    },
    purchaseTimes: {
        type: Number,
        required: false,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
ConsumerFavoriteStoreSchema.index({ consumerId: 1, business: 1, storeId: 1 }, { unique: true });
ConsumerFavoriteStoreSchema.index({ consumerId: 1, createdTime: -1 });
const ConsumerFavoriteStoreModel = mongoose_1.model('ConsumerFavoriteStore', ConsumerFavoriteStoreSchema);
exports.default = ConsumerFavoriteStoreModel;
