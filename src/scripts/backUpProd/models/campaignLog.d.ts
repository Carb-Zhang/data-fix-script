import { Document } from 'mongoose';
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
declare const CampaignLogModel: import("mongoose").Model<CampaignLogDocument, {}, {}>;
export default CampaignLogModel;
