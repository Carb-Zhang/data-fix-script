import { Schema, Document, model, Types } from 'mongoose';

export interface MerchantPaymentOptions {
    business: string;
    source: string; // Beep, Ecommerce, BackOffice
    shippingTypes: string[];
    isEnabled: boolean;
    disablingDisplayType: string; // hidden, unavailable, unsupported
    whiteListMode: boolean;
    paymentOptionNames: string[];
}

export interface MerchantPaymentOptionsDocument extends MerchantPaymentOptions, Document {
    id: string;
    createdTIme: Date;
    modifiedTime: Date;
}

export const MerchantPaymentOptionsSchema = new Schema(
    {
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
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

MerchantPaymentOptionsSchema.index({ business: 1, source: 1, shippingTypes: 1 });

export const MerchantPaymentOptionsModel = model<MerchantPaymentOptionsDocument>(
    'MerchantPaymentOptions',
    MerchantPaymentOptionsSchema,
);

export default MerchantPaymentOptionsModel;
