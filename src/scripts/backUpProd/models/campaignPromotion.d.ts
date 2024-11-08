import { Schema } from 'mongoose';
export interface CampaignPromotion {
    promotionId: string;
    customerClaimCount: number;
    validDuration?: number;
}
export declare const CampaignPromotionSchema: Schema<import("mongoose").Document<any, any, any>, import("mongoose").Model<import("mongoose").Document<any, any, any>, any, any>, undefined, {}>;
