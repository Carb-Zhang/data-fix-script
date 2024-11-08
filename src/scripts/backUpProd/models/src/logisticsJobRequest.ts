import { Document, Schema, model } from 'mongoose';

export interface LogisticsRequest {
    receiptNumber: string;
    time: Date;
    body: string;
    isPreOrder?: boolean;
    isCancelled?: boolean;
    //
    isSendOnDemandRequest?: boolean;
    status?: string;
}

export interface LogisticsRequestDocument extends LogisticsRequest, Document {
    id: string;
}

const LogisticsRequestSchema = new Schema(
    {
        receiptNumber: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        isPreOrder: {
            type: Boolean,
        },
        isCancelled: {
            type: Boolean,
        },
        isSendOnDemandRequest: {
            type: Boolean,
        },
        status: {
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

LogisticsRequestSchema.index({ receiptNumber: 1 });
LogisticsRequestSchema.index({ status: 1 }, { sparse: true });
LogisticsRequestSchema.index({ time: 1, isSendOnDemandRequest: 1 }, { sparse: true });
LogisticsRequestSchema.path('time').index({ expires: 60 * 60 * 24 * 7 });

const LogisticsRequestModel = model<LogisticsRequestDocument>(
    'LogisticsJobRequest',
    LogisticsRequestSchema,
);
export default LogisticsRequestModel;
