import { Schema, Document, model } from 'mongoose';

export interface AdditionalAttributes {
    receiptNumber?: string;
}

export interface CampaignJob {
    business: string;
    campaignId: string;
    launchId: string;
    channel: string;
    customerId?: string;
    consumerId?: string;
    customerPhone?: string;
    customerEmail?: string;
    content: string;
    pushStatus: string;
    failedReason?: string;
    promotionCustomerId?: string; // reference to promotionCustomer _id
    attributes?: Record<string, any>;
    globalCampaignInformationId?: string;
    sendTime?: Date;
    smsUnitCredits?: number;

    // Message Related Fields
    messageId?: string;
    messageStatus?: string;
    messageAmount?: number;
    messageUnits?: number;
    messageProvider?: string;
    delay?: number;
    validations?: string[];
    additionalAttributes?: AdditionalAttributes;
}

export interface CampaignJobDocument extends CampaignJob, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

export const AdditionalAttributesSchema = new Schema({
    receiptNumber: {
        type: String,
    },
});

export const CampaignJobSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        campaignId: {
            type: String,
            required: true,
        },
        launchId: {
            type: String,
            required: true,
        },
        channel: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
        },
        consumerId: {
            type: String,
        },
        customerPhone: {
            type: String,
        },
        customerEmail: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        pushStatus: {
            type: String,
            required: true,
        },
        failedReason: {
            type: String,
        },
        promotionCustomerId: {
            type: String,
        },
        attributes: {
            type: Object,
        },
        sendTime: {
            type: Date,
        },
        smsUnitCredits: {
            type: Number,
        },
        messageId: {
            type: String,
        },
        messageStatus: {
            type: String,
        },
        messageAmount: {
            type: Number,
        },
        messageUnits: {
            type: Number,
        },
        messageProvider: {
            type: String,
        },
        globalCampaignInformationId: {
            type: String,
        },
        delay: {
            type: Number,
        },
        validations: {
            type: [String],
        },
        additionalAttributes: {
            type: AdditionalAttributesSchema,
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

CampaignJobSchema.index({ business: 1, campaignId: 1, customerPhone: 1 });

export const CampaignModel = model<CampaignJobDocument>('campaignJob', CampaignJobSchema);

export default CampaignModel;
