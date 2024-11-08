import { model, Schema, Document } from 'mongoose';

interface GatewayRecordInterface extends Document {
    receiptNumber?: string;
    paymentGateway?: string;
    transactionId?: string;
    fee?: number;
    transactionAmount?: number;
    net?: number;
    transferStatus?: string;
    settlementTime?: Date;
    country?: string;
    transactionType?: string;
    reconStatus: string;
    createdTime: Date;
    modifiedTime: Date;
    paymentRecordId?: string;
}

const GatewayRecordSchema = new Schema(
    {
        receiptNumber: {
            type: String,
        },
        paymentGateway: {
            type: String,
        },
        transactionId: {
            type: String,
        },
        fee: {
            type: Number,
        },
        transactionAmount: {
            type: Number,
        },
        net: {
            type: Number,
        },
        transferStatus: {
            type: String,
        },
        settlementTime: {
            type: Date,
        },
        country: {
            type: String,
        },
        transactionType: {
            type: String,
        },
        reconStatus: {
            type: String,
            required: true,
        },
        paymentRecordId: {
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

GatewayRecordSchema.index({
    transactionId: 1,
});

const GatewayRecordModel = model<GatewayRecordInterface>('GatewayRecord', GatewayRecordSchema);
export default GatewayRecordModel;
