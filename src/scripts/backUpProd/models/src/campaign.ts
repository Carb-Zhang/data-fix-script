import { Schema, Document, model, Types } from 'mongoose';
import { CampaignPromotion, CampaignPromotionSchema } from './campaignPromotion';

export interface Campaign {
    campaignType: string;
    name: string;
    brandName: string;
    business: string;
    cron?: string;
    delay?: number; // delay duration(seconds) when campaign was triggered
    channel: string;
    initialSegmentId?: string;
    segmentId?: string;
    conditionType?: string;
    template: string;
    status: string;
    startTime?: Date;
    endTime?: Date;
    isInitial: boolean;
    cronJobKey?: string;
    promotion?: CampaignPromotion;
    timezone?: string;
    globalCampaignInformationId: string;
    isActive?: boolean;
    selectedTemplateLanguage?: string;
}

export interface CampaignDocument extends Campaign, Document<Types.ObjectId> {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

export const CampaignSchema = new Schema(
    {
        campaignType: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        business: {
            type: String,
            required: true,
        },
        brandName: {
            type: String,
        },
        cron: {
            type: String,
        },
        delay: {
            type: Number,
        },
        channel: {
            type: String,
            required: true,
        },
        initialSegmentId: {
            type: String,
        },
        segmentId: {
            type: String,
        },
        conditionType: {
            type: String,
            enum: ['TRANSACTION', 'NO_SMS_SENT', null],
            default: null,
        },
        template: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'DRAFT',
            enum: ['DRAFT', 'ACTIVE', 'SUSPENDED', 'PAUSED', 'FINISHED'],
        },
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },
        isInitial: {
            type: Boolean,
            default: true,
        },
        cronJobKey: {
            type: String,
        },
        promotion: CampaignPromotionSchema,
        timezone: {
            type: String,
        },
        globalCampaignInformationId: {
            type: String,
        },
        isActive: {
            type: Boolean,
        },
        selectedTemplateLanguage: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

CampaignSchema.index({ business: 1, name: 1 }, { unique: true });
CampaignSchema.index({ business: 1, conditionType: 1 }, { sparse: true });
CampaignSchema.index({ channel: 1 });
CampaignSchema.index({ cron: 1 });
CampaignSchema.index({ 'promotion.promotionId': 1 });

const CampaignModel = model<CampaignDocument>('campaign', CampaignSchema);

export default CampaignModel;
