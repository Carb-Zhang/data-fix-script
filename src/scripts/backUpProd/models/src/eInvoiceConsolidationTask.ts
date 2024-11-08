import { Document, Types, LeanDocument, Schema, model } from 'mongoose';

export enum TaskStatus {
    AWAIT = 'AWAIT',
    IN_PROCESS = 'IN_PROCESS',
    FAIL = 'FAIL',
    SUCCESS = 'SUCCESS',
}

export interface IEInvoiceConsolidationTask {
    month: string;
    storeId: string;
    business: string;
    eInvoiceSettings: Record<string, unknown>;

    status: TaskStatus;
    lastConsoledOrder?: {
        isOnline: boolean;
        orderId: string;
        receiptNumber: string;
        transactionType: string;
        createdTime: Date;
    };
    lastRequestRecordId: string;
    currentRunnerId: string;
    errorMessages: {
        message: string;
        createdAt: Date;
    }[];

    startedAt: Date;
    finishedAt: Date;
    statusUpdatedAt: Date;
}

const eInvoiceConsolidationTaskSchema = new Schema({
    month: String,
    storeId: String,
    business: String,

    eInvoiceSettings: Schema.Types.Mixed,
    status: { type: String, enum: Object.values(TaskStatus) },
    lastConsoledOrder: {
        isOnline: Boolean,
        orderId: String,
        receiptNumber: String,
        transactionType: String,
        createdTime: Date,
    },
    lastRequestRecordId: String,
    currentRunnerId: String,
    errorMessages: [
        {
            message: String,
            createdAt: Date,
        },
    ],

    startedAt: Date,
    finishedAt: Date,
    statusUpdatedAt: Date,
});

eInvoiceConsolidationTaskSchema.index({ month: 1, storeId: 1 }, { unique: true });

export type IEInvoiceConsolidationTaskDoc = IEInvoiceConsolidationTask & Document<Types.ObjectId>;

export type IEInvoiceConsolidationTaskDPO = LeanDocument<IEInvoiceConsolidationTaskDoc>;

export default model<IEInvoiceConsolidationTaskDoc>(
    'eInvoiceConsolidationTask',
    eInvoiceConsolidationTaskSchema,
);
