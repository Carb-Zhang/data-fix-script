import { Model, Document } from 'mongoose';

declare const Table: Model<TableSchema>;
export default Table;

export interface FrameSchema {
    width: number;
    height: number;
    xCoordinate: number;
    yCoordinate: number;
    shape?: string;
    rotate?: number;
}

export interface Table {
    business: string;
    storeId: string;
    tableName: string;
    seatingCapacity: number;
    sectionId?: string;
}

export interface Table {
    business: string;
    storeId: string;
    tableName: string;
    seatingCapacity: number;
    sectionId?: string;
    frame?: FrameSchema;
}

export interface TableSchema extends Table, Document {}
