import { Schema } from 'mongoose';

export interface CampaignPromotion {
    promotionId: string;
    customerClaimCount: number;
    validDuration?: number;
}

export const CampaignPromotionSchema = new Schema({
    promotionId: {
        type: String,
        required: true,
    },
    customerClaimCount: {
        type: Number,
        required: true,
    },
    validDuration: {
        type: Number,
    },
});
