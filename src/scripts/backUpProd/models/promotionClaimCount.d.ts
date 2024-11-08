import { Document, LeanType, Model } from "mongoose";

export interface PromotionClaimCountSchema extends Document {
    businessName?: string;
    promotionId: string;
    promotionCode?: string;
    consumerId?: string;
    customerId: string;
    count: number;
    receiptNumbers: string[];
    createdTime: Date;
    modifiedTime: Date;
    uniquePromotionCodeId: string;
}

export type PromotionClaimCountLeanType  = LeanType<PromotionClaimCountSchema>;
declare const PromotionClaimCount: Model<PromotionClaimCountSchema>;
export default PromotionClaimCount;
