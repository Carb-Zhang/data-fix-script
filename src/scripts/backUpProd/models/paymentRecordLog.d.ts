import { Schema, Document } from 'mongoose';
export interface PaymentRecordLog {
    receiptNumber: string;
    paymentRecordId: string;
    logTime: Date;
    status: string;
    source: string;
    operator?: string;
    remark?: string;
    metadata?: Record<string, any>;
}
export interface PaymentRecordLogDocument extends PaymentRecordLog, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}
export declare const PaymentRecordLogSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
export declare const PaymentRecordModel: import("mongoose").Model<PaymentRecordLogDocument, {}, {}>;
export default PaymentRecordModel;
