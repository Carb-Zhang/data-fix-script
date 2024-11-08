const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoucherSchema = new Schema(
    {
        voucherCode: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: 'MYR',
        },
        validFrom: {
            type: Date,
        },
        validTo: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['voided', 'redeemed', 'pendingRedeem', 'unused'],
            required: true,
        },
        voidReason: {
            type: String,
        },
        minSpend: {
            type: Number,
        },

        channel: {
            type: Number,
            enum: [3],
            required: true,
        },
        redeemedOrderId: {
            type: String,
        },
        business: {
            type: String,
        },
        createdByOrderId: {
            type: String,
        },
        purchaseChannel: {
            type: String,
            enum: ['unknown', 'beep', 'ist', 'cleverTapWebhook', 'systemRefund'],
        },
        remarks: {
            type: String,
        },
        consumerId: {
            type: String,
        },
        name: {
            type: String,
        },
        applicableBusiness: {
            type: [String],
        },
        coveredBySH: {
            type: Boolean,
        },
        // BEEP_PICKUP: 5, BEEP_DELIVERY: 6, BEEP_TAKEAWAY: 7, BEEP_DINE_IN: 8,
        appliedSources: {
            type: [Number],
            default: [],
        },
        appliedClientTypes: {
            type: [String],
        },
        category: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV === 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);
VoucherSchema.index({ voucherCode: 1 }, { unique: true });
VoucherSchema.index({ status: 1 });
VoucherSchema.index(
    { redeemedOrderId: 1 },
    { unique: true, partialFilterExpression: { redeemedOrderId: { $exists: true } } },
);

module.exports = mongoose.model('Voucher', VoucherSchema);
