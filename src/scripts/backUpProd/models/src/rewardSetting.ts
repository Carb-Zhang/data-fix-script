import { Schema, model, Document, LeanType } from 'mongoose';
export type RewardSettingLeanType = LeanType<RewardSettingDocument>;

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

const RewardSettingSchema = new Schema(
    {
        merchantName: { type: String, required: true },
        rewardSource: { type: String, required: true },
        rewardGroupId: String,
        rewardType: String,
        rewardRefId: String,
        validPeriod: Number,
        validPeriodUnit: String,
        isDeleted: Boolean,
        isEnabled: Boolean,
        costOfPoints: Number,
        tierLevel: Number,
    },
    {
        autoIndex: process.env.NODE_ENV !== 'production',
        timestamps: {
            updatedAt: 'modifiedTime',
            createdAt: 'createdTime',
        },
    },
);

RewardSettingSchema.index({ merchantName: 1, rewardSource: 1 });
RewardSettingSchema.index(
    { rewardGroupId: 1 },
    {
        partialFilterExpression: { rewardGroupId: { $exists: true } },
    },
);
const RewardSettingModel = model<RewardSettingDocument>('rewardSetting', RewardSettingSchema);
export default RewardSettingModel;
