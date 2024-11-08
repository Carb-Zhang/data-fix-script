import { Schema, Document } from 'mongoose';
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
    promotionCustomerId?: string;
    attributes?: Record<string, any>;
    globalCampaignInformationId?: string;
    sendTime?: Date;
    smsUnitCredits?: number;
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
export declare const AdditionalAttributesSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
export declare const CampaignJobSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
export declare const CampaignModel: import("mongoose").Model<CampaignJobDocument, {}, {}>;
export default CampaignModel;
