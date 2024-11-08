"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChargingRuleSchema = new mongoose_1.Schema({
    chargingType: {
        type: String,
    },
    chargingValue: {
        type: Number,
    },
});
const FeeRuleSchema = new mongoose_1.Schema({
    orderChannel: {
        type: String,
    },
    shippingType: {
        type: String,
    },
    paymentChannel: {
        type: String,
    },
    calculationType: {
        type: String,
    },
    chargingRules: [ChargingRuleSchema],
});
const CustomPaymentGatewayFeeSchema = new mongoose_1.Schema({
    business: {
        type: String,
        required: true,
        unique: true,
    },
    feeRules: [FeeRuleSchema],
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
CustomPaymentGatewayFeeSchema.index({
    business: 1,
});
const CustomPaymentGatewayFeeModel = (0, mongoose_1.model)('CustomPaymentGatewayFee', CustomPaymentGatewayFeeSchema);
exports.default = CustomPaymentGatewayFeeModel;
