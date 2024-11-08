import { model, Schema, Document } from 'mongoose';

interface BatchPayout extends Document {
    businessName: string;
    currency: string;
    countryCode: string;
    endDate: Date;
    bankAccountId: string;
    payoutItemCount: number;
    totalStorehubFee: number;
    totalPaymentGatewayFee: number;
    totalStorehubLogisticsFee: number;
    totalBankTransactionFee: number;
    totalPickupSmsFee?: number;
    totalOrderAmount?: number;
    totalPayout: number;
    totalAdjustments: number;
    totalOrderPayout: number;
    merchantTotalProductRevenue: number;
    merchantTotalDeliveryRevenue: number;
    merchantBankAccountName: string;
    merchantBankCode: string;
    merchantBankAccountNumber: string;
    merchantBankName?: string;
    storeIds: string[];
    createdTime: Date;
    modifiedTime: Date;
    totalVoucherAmount?: number;
    totalPromotionAmount?: number;
    totalOrderVoucherAmount?: number;
    totalOrderPromotionAmount?: number;
    totalOfflinePaidAmount?: number;
}

const BatchPayoutSchema = new Schema(
    {
        businessName: {
            type: String,
            required: true,
        },

        countryCode: {
            type: String,
            required: true,
        },

        currency: {
            type: String,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        bankAccountId: {
            type: String,
            required: true,
        },
        payoutItemCount: {
            type: Number,
            required: true,
        },
        totalStorehubFee: {
            type: Number,
            required: true,
        },
        totalPaymentGatewayFee: {
            type: Number,
            required: true,
        },
        totalStorehubLogisticsFee: {
            type: Number,
            required: true,
        },
        totalBankTransactionFee: {
            type: Number,
            required: true,
        },
        totalOrderAmount: {
            type: Number,
        },
        totalPayout: {
            type: Number,
            required: true,
        },
        totalAdjustments: {
            type: Number,
            required: true,
        },
        totalOrderPayout: {
            type: Number,
            requred: true,
        },
        merchantTotalProductRevenue: {
            type: Number,
            required: true,
        },
        merchantTotalDeliveryRevenue: {
            type: Number,
            required: true,
        },
        merchantBankAccountName: {
            type: String,
            required: true,
        },
        merchantBankCode: {
            type: String,
            required: true,
        },
        merchantBankAccountNumber: {
            type: String,
            required: true,
        },
        merchantBankName: {
            type: String,
            default: '',
        },
        storeIds: {
            type: [String],
            required: true,
        },
        totalVoucherAmount: {
            type: Number,
            default: 0,
        },
        totalPromotionAmount: {
            type: Number,
            default: 0,
        },
        totalOrderVoucherAmount: {
            type: Number,
            default: 0,
        },
        totalOrderPromotionAmount: {
            type: Number,
            default: 0,
        },
        totalOfflinePaidAmount: {
            type: Number,
            default: 0,
        },
        totalPickupSmsFee: {
            type: Number,
            default: 0,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

BatchPayoutSchema.index({
    businessName: 1,
    storeIds: 1,
});

BatchPayoutSchema.index({
    businessName: 1,
    createdTime: 1,
});

const BatchPayoutModel = model<BatchPayout>('BatchPayout', BatchPayoutSchema);

export default BatchPayoutModel;
