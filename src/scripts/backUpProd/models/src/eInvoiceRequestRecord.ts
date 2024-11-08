import { Document, Types, LeanDocument, Schema, model } from 'mongoose';

export enum RequestType {
    REQUEST_INVOICE = 'REQUEST_INVOICE',
    REQUEST_REFUND = 'REQUEST_REFUND',
    CANCEL_INVOICE = 'CANCEL_INVOICE',
    CONSOLIDATE_INVOICE = 'CONSOLIDATE_INVOICE',
    CONSOLIDATE_REFUND = 'CONSOLIDATE_REFUND',
}

export enum RequestorType {
    CUSTOMER = 'CUSTOMER',
    EMPLOYEE = 'EMPLOYEE',
    SYSTEM = 'SYSTEM',
}

export enum EInvoiceStatus {
    REJECT = 'REJECT',
    SUBMITTED = 'SUBMITTED',
    VALID = 'VALID',
    CANCEL = 'CANCEL',
}

export enum EInvoiceDocumentType {
    INVOICE = 'INVOICE',
    REFUND = 'REFUND',
    CONSOLIDATE_INVOICE = 'CONSOLIDATE_INVOICE',
    CONSOLIDATE_REFUND = 'CONSOLIDATE_REFUND',
}

const eInvoiceRequestRecordSchema = new Schema(
    {
        business: String,
        storeId: String,
        receiptNumbers: [String],
        isOnline: Boolean,

        // request info
        requestType: { type: String, enum: Object.values(RequestType) },
        rawRequestInfo: Schema.Types.Mixed,
        addOnRequestInfo: Schema.Types.Mixed,
        requestor: {
            requestorType: { type: String, enum: Object.values(RequestorType) },
            requestorId: String,
        },

        // submit info
        submitContent: Schema.Types.Mixed,
        eInvoiceDocumentType: { type: String, enum: Object.values(EInvoiceDocumentType) },

        // result
        requestResult: {
            eInvoiceStatus: { type: String, enum: Object.values(EInvoiceStatus) },

            statusUpdatedAt: Date,
            submitId: String,
            documentId: String,
            documentLongId: String,
            errorMessage: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: true,
    },
);

eInvoiceRequestRecordSchema.index({ business: 1, receiptNumbers: 1 });
eInvoiceRequestRecordSchema.index({ 'requestResult.statusUpdatedAt': -1 });

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

export default model<IEInvoiceRequestRecordDoc>(
    'eInvoiceRequestRecord',
    eInvoiceRequestRecordSchema,
);
