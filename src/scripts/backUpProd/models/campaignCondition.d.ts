import { Schema, Document } from 'mongoose';
export interface Filter {
    key: string;
    symbol: string;
    valueString?: string[];
    valueBoolean?: boolean[];
    valueNumber?: number[];
}
export interface Output {
    delay: number;
    channel: string;
    outputValidations?: string[];
}
export interface CampaignCondition {
    type: string;
    filters?: Filter[];
    output?: Output;
}
export interface CampaignConditionDocument extends CampaignCondition, Document {
    id: string;
    createdTime?: Date;
    modifiedTime?: Date;
}
export declare const FilterSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
export declare const OutputSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
export declare const CampaignConditionSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
declare const CampaignConditionModel: import("mongoose").Model<CampaignConditionDocument, {}, {}>;
export default CampaignConditionModel;
