import { Schema, Document, model } from 'mongoose';

export interface CampaignInformation {
    name: string;
    business?: string;
    description: string;
    campaignId?: string;
    images?: string[];
    customerReachedCount?: number;
    segmentRuleTypes?: string[];
    validations?: string[];
    defaultSMSTemplate?: string;
    SMSTemplateEN?: string;
    SMSTemplateMS?: string;
    SMSTemplateTH?: string;
    SMSTemplatePH?: string;
    initialRun?: boolean;
    requiredEtaCheck?: boolean;
    order?: number;
    originalId?: string;
    campaignType?: string;
    smsUnitCredits?: number;
}

export interface CampaignInformationDocument extends CampaignInformation, Document {
    id: string;
    createdTime?: Date;
    modifiedTime?: Date;
}

export const CampaignInformationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        business: {
            type: String,
        },
        images: {
            type: [String],
        },
        campaignType: {
            // DYNAMIC, STATIC_FEEDBACK
            type: String,
        },
        campaignId: {
            type: String,
        },
        customerReachedCount: {
            type: Number,
        },
        segmentRuleTypes: {
            type: [String],
        },
        validations: {
            type: [String],
        },
        defaultSMSTemplate: {
            type: String,
        },
        SMSTemplateEN: {
            type: String,
        },
        SMSTemplateMS: {
            type: String,
        },
        SMSTemplateTH: {
            type: String,
        },
        SMSTemplatePH: {
            type: String,
        },
        initialRun: {
            type: Boolean,
        },
        requiredEtaCheck: {
            type: Boolean,
        },
        order: {
            type: Number,
        },
        originalId: {
            type: String,
        },
        smsUnitCredits: {
            type: Number,
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

CampaignInformationSchema.index({ business: 1, name: 1 }, { unique: true });

const CampaignInformationModel = model<CampaignInformationDocument>(
    'CampaignInformation',
    CampaignInformationSchema,
);

export default CampaignInformationModel;
