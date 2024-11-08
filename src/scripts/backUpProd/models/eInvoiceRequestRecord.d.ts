import { Document, Types, LeanDocument } from 'mongoose';
export declare enum RequestType {
    REQUEST_INVOICE = 'REQUEST_INVOICE',
    REQUEST_REFUND = 'REQUEST_REFUND',
    CANCEL_INVOICE = 'CANCEL_INVOICE',
    CONSOLIDATE_INVOICE = 'CONSOLIDATE_INVOICE',
    CONSOLIDATE_REFUND = 'CONSOLIDATE_REFUND',
}
export declare enum RequestorType {
    CUSTOMER = 'CUSTOMER',
    EMPLOYEE = 'EMPLOYEE',
    SYSTEM = 'SYSTEM',
}
export declare enum EInvoiceStatus {
    REJECT = 'REJECT',
    SUBMITTED = 'SUBMITTED',
    VALID = 'VALID',
    CANCEL = 'CANCEL',
}
export declare enum EInvoiceDocumentType {
    INVOICE = 'INVOICE',
    REFUND = 'REFUND',
    CONSOLIDATE_INVOICE = 'CONSOLIDATE_INVOICE',
    CONSOLIDATE_REFUND = 'CONSOLIDATE_REFUND',
}
export interface IEInvoiceRequestRecord {
    business: string;
    storeId: string;
    receiptNumbers: string[];
    isOnline: boolean;
    requestType: RequestType;
    rawRequestInfo: Record<string, unknown>;
    addOnRequestInfo?: Record<string, unknown>;
    requestor: {
        requestorType: RequestorType;
        requestorId: string;
    };
    submitContent: Record<string, unknown>;
    eInvoiceDocumentType: EInvoiceDocumentType;
    requestResult: {
        eInvoiceStatus: EInvoiceStatus;
        statusUpdatedAt: Date;
        submitId?: string;
        documentId?: string;
        documentLongId?: string;
        errorMessage?: string;
    };
}
export type IEInvoiceRequestRecordDoc = IEInvoiceRequestRecord & Document<Types.ObjectId>;
export type IEInvoiceRequestRecordDPO = LeanDocument<IEInvoiceRequestRecordDoc>;
declare const _default: import('mongoose').Model<IEInvoiceRequestRecordDoc, {}, {}>;
export default _default;
