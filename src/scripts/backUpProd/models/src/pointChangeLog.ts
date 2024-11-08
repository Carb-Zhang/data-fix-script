import { Document, Schema, model } from 'mongoose';

export interface ExtraInfo {
    isOnline?: boolean;
    receiptNumber?: string;
}

export interface PointInfo {
    pointId: string;
    changeAmount: number;
}

export interface PointChangeLog {
    merchantName: string;
    customerId: string;
    type: string;
    changeAmount: number; //+ or -
    eventTime: Date;
    points: PointInfo[];
    extraInfo?: ExtraInfo;
}

export interface PointChangeLogDocument extends PointChangeLog, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

const PointInfoSchema = new Schema({
    pointId: {
        type: String,
        required: true,
    },
    changeAmount: {
        type: Number,
        required: true,
    },
});

const ExtraInfoSchema = new Schema({
    isOnline: {
        type: Boolean,
    },
    receiptNumber: {
        type: String,
    },
});

const PointChangeLogSchema = new Schema(
    {
        merchantName: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        changeAmount: {
            type: Number,
            required: true,
        },
        eventTime: {
            type: Date,
            required: true,
        },
        points: [PointInfoSchema],
        extraInfo: ExtraInfoSchema,
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

PointChangeLogSchema.index({ merchantName: 1, customerId: 1, type: 1, eventTime: 1 });

const PointChangeLogModel = model<PointChangeLogDocument>('PointChangeLog', PointChangeLogSchema);
export default PointChangeLogModel;
