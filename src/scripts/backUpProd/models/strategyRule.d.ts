import { Document } from 'mongoose';
export interface StrategyRule {
    timeline: Timeline;
    country: string;
    actionName: string;
    rideType?: string;
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
declare const StrategyRuleModel: import("mongoose").Model<StrategyRuleDocument, {}, {}>;
export default StrategyRuleModel;
