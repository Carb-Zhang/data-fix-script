import { Schema, Document, model } from 'mongoose';

export interface RewardsSet {
    business: string;
    // generality, welcomeNewMembership
    type: string;
    isEnabled: boolean;
    promotionConfigs?: RewardsSetPromotionConfig[];
}

export interface RewardsSetPromotionConfig {
    promotionId: string;
    validNumber?: number;
    // days, week
    validUnit?: string;
}

export interface RewardsSetDocument extends RewardsSet, Document {
    id: string;
    createdTime?: Date;
    modifiedTime?: Date;
}

const PromotionConfigSchema = new Schema({
    promotionId: {
        type: String,
        required: true,
    },
    validNumber: {
        type: Number,
    },
    // days, week
    validUnit: {
        type: String,
    },
});

export const RewardsSetSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        // generality, welcomeNewMembership
        type: {
            type: String,
            required: true,
        },
        promotionConfigs: {
            type: [PromotionConfigSchema],
        },
        isEnabled: {
            type: Boolean,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    },
);

RewardsSetSchema.index({ business: 1, type: 1 });

const RewardsSetModel = model<RewardsSetDocument>('rewardsSet', RewardsSetSchema);

export default RewardsSetModel;
