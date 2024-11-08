import { model, Schema, Document } from 'mongoose';

interface GatewayRetrieveLogInterface extends Document {
    paymentGateway?: string;
    retrievedFrom: number;
    retrievedTo: number;
    files?: string[]; //stripe report file id
    country?: string;
    recordCount?: number;
    logType?: string; // generate, prepare
    createdTime?: Date;
    modifiedTime?: Date;
}

const GatewayRetrieveLogSchema = new Schema(
    {
        paymentGateway: {
            type: String,
        },
        retrievedFrom: {
            type: Number,
        },
        retrievedTo: {
            type: Number,
        },
        files: {
            type: [String],
        },
        country: {
            type: String,
        },
        recordCount: {
            type: Number,
        },
        logType: {
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

const GatewayRetrieveLogModel = model<GatewayRetrieveLogInterface>(
    'GatewayRetrieveLog',
    GatewayRetrieveLogSchema,
);
export default GatewayRetrieveLogModel;
