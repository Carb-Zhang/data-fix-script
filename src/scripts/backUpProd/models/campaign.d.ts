import { Schema, Document, Types } from 'mongoose';
import { CampaignPromotion } from './campaignPromotion';
export interface Campaign {
    campaignType: string;
    name: string;
    brandName: string;
    business: string;
    cron?: string;
    delay?: number;
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
export declare const CampaignSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
declare const CampaignModel: import("mongoose").Model<CampaignDocument, {}, {}>;
export default CampaignModel;
