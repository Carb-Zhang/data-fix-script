import { Types, Schema, Document, model } from 'mongoose';

interface ChargingRule {
    chargingType: string;
    chargingValue: number;
}

interface FeeRule {
    orderChannel: string;
    shippingType: string;
    paymentChannel: string;
    calculationType: string;
    chargingRules: ChargingRule[];
}

export interface CustomPaymentGatewayFeeDocument extends Document<Types.ObjectId> {
    business: string;
    feeRules: FeeRule[];
    createdTime: Date;
    modifiedTime: Date;
}

const ChargingRuleSchema = new Schema({
    chargingType: {
        type: String,
    },
    chargingValue: {
        type: Number,
    },
});

const FeeRuleSchema = new Schema({
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

const CustomPaymentGatewayFeeSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
            unique: true,
        },
        feeRules: [FeeRuleSchema],
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

CustomPaymentGatewayFeeSchema.index({
    business: 1,
});

const CustomPaymentGatewayFeeModel = model<CustomPaymentGatewayFeeDocument>(
    'CustomPaymentGatewayFee',
    CustomPaymentGatewayFeeSchema,
);

export default CustomPaymentGatewayFeeModel;
