import { model, Schema, Document } from 'mongoose';

enum PayoutType {
    PAY = 'pay',
    COLLECT = 'collect',
}
interface StorehubDetailsInterface extends Document {
    storehubLogisticsCost?: number;
    storehubLogisticsRevenue?: number;
}

interface AdjustmentDetailsInterface extends Document {
    reason?: string;
    remarks?: string;
    amount?: number;
    adjustmentItems?: AdjustmentItemInterface[];
}

interface AdjustmentItemInterface extends Document {
    refId: string;
    refType: string;
    amount: number;
    title: string;
    quantity: number;
    type: string;
}

export interface PayoutItemInterface extends Document {
    batchPayoutId?: string;
    businessName: string;
    storeId: string;
    countryCode: string;
    receiptNumber?: string;
    payoutStatus: string;
    payoutType: PayoutType;
    paymentGateway?: string;
    paymentProviderMID?: string;
    orderAmount?: number;
    paidAmount?: number;
    voucherAmount?: number;
    promotionAmount?: number;
    amount: number;
    settledAt: Date;
    transactionFeeRate?: number;
    transactionFee?: number;
    paymentGatewayFeeDetail: {
        calculationType: string;
        fixedAmountFee: number;
        rate: number;
    };
    paymentGatewayFee?: number;
    logisticsFee?: number;
    pickupSmsFee: number;
    productRevenue?: number;
    deliveryRevenue?: number;
    createdTime: Date;
    modifiedTime: Date;
    refId: string;
    refType: string;
    cause: string;
    storehubDetails: StorehubDetailsInterface;
    reconStatus: string;
    adjustmentDetails: AdjustmentDetailsInterface;
    refundedAmount?: number;
    orderVoucherAmount?: number;
    orderPromotionAmount?: number;
    offlinePaidAmount?: number;
    shippingType?: string;
}

const paymentGatewayFeeDetail = new Schema({
    calculationType: {
        type: String,
    },
    fixedAmountFee: Number,
    rate: Number,
});

const StorehubDetailsSchema = new Schema({
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

const AdjustmentItemSchema = new Schema({
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

const AdjustmentDetailsSchema = new Schema({
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

const PayoutItemSchema = new Schema(
    {
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
        paymentProviderMID: {
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
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

PayoutItemSchema.index(
    {
        batchPayoutId: 1,
    },
    {
        sparse: true,
    },
);
PayoutItemSchema.index({
    businessName: 1,
});

PayoutItemSchema.index(
    {
        receiptNumber: 1,
    },
    {
        sparse: true,
    },
);
PayoutItemSchema.index(
    {
        refId: 1,
        refType: 1,
        cause: 1,
    },
    {
        unique: true,
    },
);

PayoutItemSchema.index({
    payoutStatus: 1,
});
PayoutItemSchema.index({
    countryCode: 1,
    settledAt: 1,
});

const PayoutItemModel = model<PayoutItemInterface>('PayoutItem', PayoutItemSchema);
export default PayoutItemModel;
