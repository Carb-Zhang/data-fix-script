import { Document } from 'mongoose';
export interface CustomerPoint {
    merchantName: string;
    customerId: string;
    pointRate?: number;
    total: number;
    balance: number;
    expiryDate?: Date;
    source: string;
    sourceRefId?: string;
}
export interface CustomerPointDocument extends CustomerPoint, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}
declare const CustomerPointModel: import("mongoose").Model<CustomerPointDocument, {}, {}>;
export default CustomerPointModel;
