import { Schema, Document, model } from 'mongoose';

export interface Filter {
    key: string;
    condition: string;
    valueDate?: Date;
    valueNumber?: string;
    valueString?: string;
    funcName?: string;
    symbol?: string;
    segmentRuleType?: string;
    //defined as the standard compared value.
    //for example, when it's null, value is compared with GETADD(). otherwise, value is compared with the value
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

export const FilterSchema = new Schema({
    key: {
        type: String,
    },
    condition: {
        type: String,
    },
    valueNumber: {
        type: String,
    },
    valueString: {
        type: String,
    },
    valueDate: {
        type: Date,
    },
    symbol: {
        type: String,
    },
    funcName: {
        type: String,
    },
    segmentRuleType: {
        type: String,
    },
});

export const NestedSchema = new Schema({
    source: {
        type: String,
        required: true,
    },
    groupBys: {
        type: [String],
    },
    filters: {
        type: [FilterSchema],
    },
});

export const CampaignSegmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        business: {
            type: String,
        },
        nestedSource: {
            type: NestedSchema,
        },
        filters: {
            type: [FilterSchema],
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

CampaignSegmentSchema.index({ name: 1, business: 1 }, { unique: true });

const CampaignSegmentModel = model<CampaignSegmentDocument>(
    'campaignSegment',
    CampaignSegmentSchema,
);

export default CampaignSegmentModel;
