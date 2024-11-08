"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ThirdPartyOnlineOrderSchema = new mongoose_1.Schema({
    channel: {
        type: Number,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    content: {
        type: Object,
        required: true,
    },
    isCancellationNotTakeEffect: Boolean,
}, {
    autoIndex: process.env.NODE_ENV == 'development',
});
const ThirdPartyOnlineOrderModel = (0, mongoose_1.model)('thirdPartyOnlineOrder', ThirdPartyOnlineOrderSchema);
exports.default = ThirdPartyOnlineOrderModel;
