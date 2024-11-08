import { Document, LeanType, Model } from "mongoose";
export interface BusinessUniversalPromoClaimInfoSchema extends Document {
    promoBusiness: string;
    claimedBusiness: string;
    promotionId: string;
    promotionCode?: string;
    count: number;
    createdTime: Date;
    modifiedTime: Date;
}
export type BusinessUniversalPromoClaimInfoLeanType = LeanType<BusinessUniversalPromoClaimInfoSchema>;
declare const BusinessUniversalPromoClaimInfo: Model<BusinessUniversalPromoClaimInfoSchema>;
export default BusinessUniversalPromoClaimInfo;
