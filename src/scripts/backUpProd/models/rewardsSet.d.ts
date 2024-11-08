import { Schema, Document } from 'mongoose';
export interface RewardsSet {
    business: string;
    type: string;
    isEnabled: boolean;
    promotionConfigs?: RewardsSetPromotionConfig[];
}
export interface RewardsSetPromotionConfig {
    promotionId: string;
    validNumber?: number;
    validUnit?: string;
}
export interface RewardsSetDocument extends RewardsSet, Document {
    id: string;
    createdTime?: Date;
    modifiedTime?: Date;
}
export declare const RewardsSetSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
declare const RewardsSetModel: import("mongoose").Model<RewardsSetDocument, {}, {}>;
export default RewardsSetModel;
