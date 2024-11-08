import mongoose, { Schema, Document } from 'mongoose';

interface RateConfigInterface extends Document {
    ecommerce?: number;
    beepInStore?: number;
    beepDelivery?: number;
    beepPickUp?: number;
    beepTakeaway?: number;
    beepSelfDelivery?: number;
}

interface CustomTransactionFeeRateInterface extends Document {
    business: string;
    rateConfig: RateConfigInterface;
    createdTime: Date;
    modifiedTime: Date;
}

const RateConfigSchema = new Schema({
    ecommerce: {
        type: Number,
    },
    beepInStore: {
        type: Number,
    },
    beepDelivery: {
        type: Number,
    },
    beepPickUp: {
        type: Number,
    },
    beepTakeaway: {
        type: Number,
    },
    beepSelfDelivery: {
        type: Number,
    },
});

const CustomTransactionFeeRateSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
            unique: true,
        },
        rateConfig: {
            type: RateConfigSchema,
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

CustomTransactionFeeRateSchema.index({
    business: 1,
});

const CustomTransactionFeeRateModel = mongoose.model<CustomTransactionFeeRateInterface>(
    'CustomTransactionFeeRate',
    CustomTransactionFeeRateSchema,
);
export default CustomTransactionFeeRateModel;
