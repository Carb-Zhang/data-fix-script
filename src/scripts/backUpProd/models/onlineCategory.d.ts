import { Model, Document } from 'mongoose';
declare const OnlineCategory: Model<OnlineCategorySchema>;
export default OnlineCategory;

export interface ConditionInstance {
    type: string;
    operator?: string;
    operand?: string[];
}

export interface ConditionSchema extends ConditionInstance, Document {}

export interface OnlineCategoryInstance {
    business: string;
    name: string;
    slug: string;
    isEnabled: boolean;
    ordering?: number;
    conditionsMatch: string;
    conditions: ConditionSchema[] | ConditionInstance[];
    isEditable?: boolean;
    channels?: number[];
    appliedStores?: string[];
    appliedSources?: number[];
    sortType?: 'TITLE' | 'PRICE';
    sortOrdering?: 'ASC' | 'DESC';
}

export interface OnlineCategorySchema extends Document, OnlineCategoryInstance {}
