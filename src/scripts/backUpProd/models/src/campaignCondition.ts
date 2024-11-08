import { Schema, Document, model } from 'mongoose';

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

export const FilterSchema = new Schema({
    key: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    valueString: {
        type: [String],
    },
    valueBoolean: {
        type: [Boolean],
    },
    valueNumber: {
        type: [Number],
    },
});

export const OutputSchema = new Schema({
    delay: {
        type: Number,
    },
    channel: {
        type: String,
    },
    outputValidations: {
        type: [String],
    },
});

export const CampaignConditionSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
        filters: {
            type: [FilterSchema],
        },
        output: {
            type: OutputSchema,
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

CampaignConditionSchema.index({ type: 1 });

const CampaignConditionModel = model<CampaignConditionDocument>(
    'campaignCondition',
    CampaignConditionSchema,
);

export default CampaignConditionModel;
