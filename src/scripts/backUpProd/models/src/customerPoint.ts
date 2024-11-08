import { Document, Schema, model } from 'mongoose';

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

const CustomerPointSchema = new Schema(
    {
        merchantName: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        pointRate: {
            type: Number,
        },
        total: {
            type: Number,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        expiryDate: {
            type: Date,
        },
        source: {
            type: String,
            required: true,
        },
        sourceRefId: {
            type: String,
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

CustomerPointSchema.index({ merchantName: 1, customerId: 1, expiryDate: 1, balance: 1 });
CustomerPointSchema.index({ expiryDate: 1, balance: 1 });
CustomerPointSchema.index({ merchantName: 1, sourceRefId: 1 }, { unique: true, partialFilterExpression: { sourceRefId: { $type: 'string' } } });

const CustomerPointModel = model<CustomerPointDocument>('CustomerPoint', CustomerPointSchema);
export default CustomerPointModel;
