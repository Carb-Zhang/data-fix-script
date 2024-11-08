import { Document, Types, LeanDocument } from 'mongoose';
export declare enum TaskStatus {
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
export type IEInvoiceConsolidationTaskDoc = IEInvoiceConsolidationTask & Document<Types.ObjectId>;
export type IEInvoiceConsolidationTaskDPO = LeanDocument<IEInvoiceConsolidationTaskDoc>;
declare const _default: import('mongoose').Model<IEInvoiceConsolidationTaskDoc, {}, {}>;
export default _default;
