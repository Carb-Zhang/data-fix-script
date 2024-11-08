import { Schema, Document } from 'mongoose';
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
export declare const CampaignInformationSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
declare const CampaignInformationModel: import("mongoose").Model<CampaignInformationDocument, {}, {}>;
export default CampaignInformationModel;
