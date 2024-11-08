"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var PayoutType;
(function (PayoutType) {
    PayoutType["PAY"] = "pay";
    PayoutType["COLLECT"] = "collect";
})(PayoutType || (PayoutType = {}));
const paymentGatewayFeeDetail = new mongoose_1.Schema({
    calculationType: {
        type: String,
    },
    fixedAmountFee: Number,
    rate: Number,
});
const StorehubDetailsSchema = new mongoose_1.Schema({
    storehubLogisticsCost: {
        type: Number,
        required: true,
    },
    storehubLogisticsRevenue: {
        type: Number,
        required: true,
    },
    paymentGatewayCost: {
        type: Number,
    },
    paymentGatewayRevenue: {
        type: Number,
    },
});
const AdjustmentItemSchema = new mongoose_1.Schema({
    refId: {
        type: String,
    },
    refType: {
        type: String,
    },
    amount: {
        type: Number,
    },
    title: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    type: {
        type: String,
    },
});
const AdjustmentDetailsSchema = new mongoose_1.Schema({
    reason: {
        type: String,
    },
    remarks: {
        type: String,
    },
    amount: {
        type: Number,
    },
    adjustmentItems: {
        type: [AdjustmentItemSchema],
    },
});
const PayoutItemSchema = new mongoose_1.Schema({
    batchPayoutId: {
        type: String,
    },
    businessName: {
        type: String,
        required: true,
    },
    storeId: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    receiptNumber: {
        type: String,
    },
    payoutStatus: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['completed', 'pending'],
    },
    payoutType: {
        type: String,
        required: true,
        enum: ['pay', 'collect'],
    },
    paymentGateway: {
        type: String,
    },
    orderAmount: {
        type: Number,
        required: true,
    },
    paidAmount: {
        type: Number,
        required: true,
    },
    voucherAmount: {
        type: Number,
        default: 0,
    },
    promotionAmount: {
        type: Number,
        default: 0,
    },
    orderVoucherAmount: {
        type: Number,
        default: 0,
    },
    orderPromotionAmount: {
        type: Number,
        default: 0,
    },
    amount: {
        type: Number,
        required: true,
    },
    settledAt: {
        type: Date,
        required: true,
    },
    transactionFeeRate: {
        type: Number,
        required: true,
    },
    transactionFee: {
        type: Number,
        required: true,
    },
    paymentGatewayFeeDetail: {
        type: paymentGatewayFeeDetail,
    },
    paymentGatewayFee: {
        type: Number,
        required: true,
    },
    logisticsFee: {
        type: Number,
        required: true,
    },
    pickupSmsFee: {
        type: Number,
        default: 0,
    },
    productRevenue: {
        type: Number,
        required: true,
    },
    deliveryRevenue: {
        type: Number,
        required: true,
    },
    refId: {
        type: String,
        required: true,
    },
    refType: {
        type: String,
        required: true,
    },
    cause: {
        type: String,
        required: true,
        enum: ['sell', 'cancel', 'adjustment'],
    },
    storehubDetails: {
        type: StorehubDetailsSchema,
    },
    reconStatus: {
        type: String,
        default: 'pending',
        required: true,
        enum: ['passed', 'pending'],
    },
    adjustmentDetails: {
        type: AdjustmentDetailsSchema,
    },
    refundedAmount: {
        type: Number,
        default: 0,
    },
    offlinePaidAmount: {
        type: Number,
        default: 0,
    },
    shippingType: {
        type: String,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
PayoutItemSchema.index({
    batchPayoutId: 1,
}, {
    sparse: true,
});
PayoutItemSchema.index({
    businessName: 1,
});
PayoutItemSchema.index({
    receiptNumber: 1,
}, {
    sparse: true,
});
PayoutItemSchema.index({
    refId: 1,
    refType: 1,
    cause: 1,
}, {
    unique: true,
});
PayoutItemSchema.index({
    payoutStatus: 1,
});
PayoutItemSchema.index({
    countryCode: 1,
    settledAt: 1,
});
const PayoutItemModel = (0, mongoose_1.model)('PayoutItem', PayoutItemSchema);
exports.default = PayoutItemModel;
