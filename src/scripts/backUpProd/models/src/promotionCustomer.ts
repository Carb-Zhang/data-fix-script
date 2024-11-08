import { Schema, Document, model } from 'mongoose';

export interface PromotionCustomer {
    promotionId: string;
    customerId: string;
    consumerId?: string;
    restClaimCount?: number;
    promotionCode?: string;
    validFrom?: Date;
    validTo?: Date;
    status?: string;
    business: string;
    // deprecated
    rewardsSetId?: string;
    rewardSettingId?: string;
    isDeleted?: boolean;
}

export interface PromotionCustomerDocument extends PromotionCustomer, Document {
    id: string;
}

export const PromotionCustomerSchema = new Schema(
    {
        promotionId: {
            type: String,
            required: true,
        },
        business: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        consumerId: {
            type: String,
        },
        promotionCode: {
            type: String,
        },
        restClaimCount: {
            type: Number,
            default: 0,
        },
        validFrom: {
            type: Date,
        },
        validTo: {
            type: Date,
        },
        status: {
            // enums: {'expired', 'active'}
            type: String,
        },
        rewardsSetId: {
            type: String,
        },
        rewardSettingId: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
        },
    },
);

PromotionCustomerSchema.index({ promotionId: 1, customerId: 1, consumerId: 1, status: 1 });
PromotionCustomerSchema.index({ promotionCode: 1 });
PromotionCustomerSchema.index({ validFrom: 1, validTo: 1 });
PromotionCustomerSchema.index({ validTo: 1 });
PromotionCustomerSchema.index({ business: 1, customerId: 1, validTo: 1 });
PromotionCustomerSchema.index({ consumerId: 1, validTo: 1 });

const PromotionCustomerModel = model<PromotionCustomerDocument>(
    'promotionCustomer',
    PromotionCustomerSchema,
);

export default PromotionCustomerModel;
