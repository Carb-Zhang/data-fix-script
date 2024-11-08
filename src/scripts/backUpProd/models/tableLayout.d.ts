import { Model, Document } from 'mongoose';
import { ObjectId } from 'bson';

declare const TableLayout: Model<TableLayoutSchema>;
export default TableLayout;

export interface SectionSchema {
    sectionId: string;
    sectionName: string;
    order?: number;
}

export interface TableLayout {
    business?: string;
    storeId?: string;
    sections?: SectionSchema[];
    appVersion: number;
}

export interface TableLayoutSchema extends TableLayout, Document {}
