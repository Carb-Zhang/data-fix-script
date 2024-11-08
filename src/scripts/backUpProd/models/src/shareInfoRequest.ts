import { Schema, Document, model } from 'mongoose';

export interface ShareInfoRequest {
    merchantName: string;
    expiredDate?: Date;
    scannedDate?: Date;
    source?: string;
    consumerId?: string;
    customerId?: string;
    isNewCustomer?: boolean;
    sharedInfoDate?: Date;
    registerId?: string;
    storeId?: string;
    employeeId?: string;
    isNewMember?: boolean;
}
export interface ShareInfoRequestDocument extends ShareInfoRequest, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

const ShareInfoRequestSchema = new Schema(
    {
        merchantName: {
            type: String,
            required: true,
        },
        expiredDate: {
            type: Date,
        },
        scannedDate: {
            type: Date,
        },
        source: {
            type: String,
        },
        consumerId: {
            type: String,
        },
        customerId: {
            type: String,
        },
        sharedInfoDate: {
            type: Date,
        },
        registerId: {
            type: String,
        },
        isNewCustomer: {
            type: Boolean,
        },
        storeId: {
            type: String,
        },
        employeeId: {
            type: String,
        },
        isNewMember: {
            type: Boolean,
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

ShareInfoRequestSchema.index({ merchantName: 1, registerId: 1 });

const ShareInfoRequestModel = model<ShareInfoRequestDocument>(
    'ShareInfoRequest',
    ShareInfoRequestSchema,
);

export default ShareInfoRequestModel;
