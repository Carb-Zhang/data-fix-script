import { Schema, Document, model } from 'mongoose';

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

export const PaymentRecordLogSchema = new Schema(
    {
        receiptNumber: {
            type: String,
            required: true,
        },
        paymentRecordId: {
            type: String,
            required: true,
        },
        logTime: {
            type: Date,
            required: true,
            default: Date.now,
        },
        status: {
            type: String,
            required: true,
        },
        source: {
            type: String,
        },
        operator: {
            type: String,
        },
        remark: {
            type: String,
        },
        metadata: {
            type: Schema.Types.Mixed,
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

PaymentRecordLogSchema.index({ receiptNumber: 1, paymentRecordId: 1 });

export const PaymentRecordModel = model<PaymentRecordLogDocument>(
    'paymentRecordLog',
    PaymentRecordLogSchema,
);

export default PaymentRecordModel;
