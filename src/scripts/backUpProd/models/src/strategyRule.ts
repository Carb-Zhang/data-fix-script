import { Document, Schema, model } from 'mongoose';

export interface StrategyRule {
    timeline: Timeline;
    country: string;
    actionName: string;
    rideType?: string; // deprecated, rename to assignRideType

    assignRideType?: string;

    filterRideType?: string;

    providerName?: string;
    halal?: string;
    isPreOrder?: boolean;
    deliveryRange?: number[];
}

export interface Timeline {
    minutes: number;
    order: number;
}

export interface StrategyRuleDocument extends StrategyRule, Document {
    id: string;
}

const TimelineSchema = new Schema(
    {
        minutes: {
            type: Number,
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    },
);

const StrategyRuleSchema = new Schema(
    {
        timeline: {
            type: TimelineSchema,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        actionName: {
            type: String,
            required: true,
        },
        rideType: {
            type: String,
        },
        assignRideType: {
            type: String,
        },
        filterRideType: {
            type: String,
        },
        providerName: {
            type: String,
        },
        halal: {
            type: String,
        },
        isPreOrder: {
            type: Boolean,
        },
        deliveryRange: {
            type: [Number],
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);
StrategyRuleSchema.index({ country: 1 });

const StrategyRuleModel = model<StrategyRuleDocument>('StrategyRule', StrategyRuleSchema);
export default StrategyRuleModel;
