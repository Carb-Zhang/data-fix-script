import { Document, Schema, model } from 'mongoose';

export interface AdditionalLogData {
    creditsDueForDeduction?: number;
    creditsActualDeducted?: number;

    customerCount?: number;
}

export interface CampaignLog {
    campaignId: string;
    business?: string;
    operation?: string;
    status?: string;
    reason?: string;
    additionalLogData?: AdditionalLogData;
}

export interface CampaignLogDocument extends CampaignLog, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

const CampaignLogSchema = new Schema(
    {
        campaignId: {
            type: String,
            required: true,
        },
        business: {
            type: String,
        },
        operation: {
            type: String,
        },
        status: {
            type: String,
        },
        reason: {
            type: String,
        },
        additionalLogData: {
            creditsDueForDeduction: {
                type: Number,
            },
            creditsActualDeducted: {
                type: Number,
            },
            customerCount: {
                type: Number,
            },
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

CampaignLogSchema.index({ campaignId: 1 });
CampaignLogSchema.index({ business: 1 });
CampaignLogSchema.path('createdTime').index({ expires: 60 * 60 * 24 * 30 * 6 });

const CampaignLogModel = model<CampaignLogDocument>('CampaignLog', CampaignLogSchema);
export default CampaignLogModel;
