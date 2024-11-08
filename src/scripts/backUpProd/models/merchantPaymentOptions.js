"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantPaymentOptionsModel = exports.MerchantPaymentOptionsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MerchantPaymentOptionsSchema = new mongoose_1.Schema({
    business: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    shippingTypes: {
        type: [String],
    },
    whiteListMode: {
        type: Boolean,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        required: true,
        default: false,
    },
    disablingDisplayType: {
        type: String,
    },
    paymentOptionNames: {
        type: [String],
        required: true,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.MerchantPaymentOptionsSchema.index({ business: 1, source: 1, shippingTypes: 1 });
exports.MerchantPaymentOptionsModel = (0, mongoose_1.model)('MerchantPaymentOptions', exports.MerchantPaymentOptionsSchema);
exports.default = exports.MerchantPaymentOptionsModel;
