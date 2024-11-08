import { Document, LeanType } from 'mongoose';
export declare type RewardSettingLeanType = LeanType<RewardSettingDocument>;
export interface RewardSetting {
    merchantName: string;
    rewardSource: string;
    rewardGroupId?: string;
    rewardType: string;
    rewardRefId?: string;
    validPeriod: number;
    validPeriodUnit: string;
    costOfPoints?: number;
    tierLevel?: number;
    isEnabled?: boolean;
    isDeleted?: boolean;
}
export interface RewardSettingDocument extends RewardSetting, Document {
    id?: string;
    createdTime?: Date;
    modifiedTime?: Date;
}
declare const RewardSettingModel: import("mongoose").Model<RewardSettingDocument, {}, {}>;
export default RewardSettingModel;
