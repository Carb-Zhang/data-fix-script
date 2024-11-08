const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettleOrderSchema = new Schema({
    receiptNumber: {
        type: String,
        required: true
    },
    total: {
        type: Number,
    },
    storehubFee: {
        type: Number,
        required: true
    },
    storehubLogisticsFee: {
        type: Number,
        required: true,
    },
    paymentGatewayFee: {
        type: Number,
        required: true
    },
    payout: {
        type: Number,
        required: true
    },
    paymentGateway: {
        type: String,
    },
    createdTime: {
        type: Date
    },
    storehubLogisticsCost: {
        type: Number,
        required: true
    },
    paymentGatewayCost: {
        type: Number,
        required: true
    },
    paymentGatewayRevenue: {
        type: Number,
        required: true
    },
    storehubLogisticsRevenue: {
        type: Number,
        required: true
    },
    productRevenue: {
        type: Number,
        required: true,
    },
    deliveryRevenue: {
        type: Number,
        required: true
    },
});
const PaymentSettlementSchema = new Schema({
    businessName: {
        type: String,
        required: true,
    },
    planId: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    orders: {
        type: [SettleOrderSchema],
    },
    totalOrdersAmount: {
        type: Number,
        required: true
    },
    totalPaymentGatewayFee: {
        type: Number,
        required: true
    },
    totalStorehubFee: {
        type: Number,
        required: true
    },
    totalStorehubLogisticsFee: {
        type: Number,
        required: true,
    },
    totalBankTransactionFee: {
        type: Number,
        required: true,
    },
    totalPayout: {
        type: Number,
        required: true
    },
    merchantBankName: {
        type: String,
        required: true,
    },
    merchantBankAccountNumber: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    orderCount: {
        type: Number
    },
    totalStorehubLogisticsCost: {
        type: Number,
        required: true,
    },
    totalStorehubLogisticsRevenue: {
        type: Number,
        required: true,
    },
    totalPaymentGatewayRevenue: {
        type: Number,
        required: true,
    },
    totalPaymentGatewayCost: {
        type: Number,
        required: true,
    },
    totalProductRevenue: {
        type: Number,
        required: true,
    },
    totalDeliveryRevenue: {
        type: Number,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime'
    }
});

PaymentSettlementSchema.index({ businessName: 1, startDate: 1, endDate: 1 });
PaymentSettlementSchema.index({ businessName: 1, 'orders.receiptNumber': 1 });
module.exports = mongoose.model('PaymentSettlement', PaymentSettlementSchema);