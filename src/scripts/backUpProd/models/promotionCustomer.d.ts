import { Schema, Document } from 'mongoose';
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
    rewardsSetId?: string;
    rewardSettingId?: string;
    isDeleted?: boolean;
}
export interface PromotionCustomerDocument extends PromotionCustomer, Document {
    id: string;
}
export declare const PromotionCustomerSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
declare const PromotionCustomerModel: import("mongoose").Model<PromotionCustomerDocument, {}, {}>;
export default PromotionCustomerModel;
