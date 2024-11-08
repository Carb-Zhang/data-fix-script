import { Schema, Document } from 'mongoose';
export interface Filter {
    key: string;
    condition: string;
    valueDate?: Date;
    valueNumber?: string;
    valueString?: string;
    funcName?: string;
    symbol?: string;
    segmentRuleType?: string;
    defaultComparedValue?: string;
}
export interface CampaignSegment {
    name: string;
    business?: string;
    nestedSource?: {
        source: string;
        filters?: Filter[];
        groupBys?: string[];
    };
    filters?: Filter[];
}
export interface CampaignSegmentDocument extends CampaignSegment, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}
export declare const FilterSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
export declare const NestedSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
export declare const CampaignSegmentSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
declare const CampaignSegmentModel: import("mongoose").Model<CampaignSegmentDocument, {}, {}>;
export default CampaignSegmentModel;
