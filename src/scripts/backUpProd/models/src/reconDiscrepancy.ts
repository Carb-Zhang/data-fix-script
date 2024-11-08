import { model, Schema, Document } from 'mongoose';
interface ReconDiscrepancyPayoutItem {
    paidAmount: number;
    payoutType: string;
    itemId: string;
    settledAt: Date;
}

interface ReconDiscrepancyGatewayRecord {
    transactionAmount: number;
    transactionId: string;
    transactionType: string;
    settlementTime: Date;
}

export interface ReconDiscrepancyLog {
    event: string;
    date: Date;
    payoutItems?: ReconDiscrepancyPayoutItem[];
    gatewayRecords?: ReconDiscrepancyGatewayRecord[];
}

interface ReconDiscrepancy extends Document {
    discrepancyType: string;
    receiptNumber: string;
    payoutItems?: ReconDiscrepancyPayoutItem[];
    gatewayRecords?: ReconDiscrepancyGatewayRecord[];
    isResolved: boolean;
    createdTime: Date;
    modifiedTime: Date;
    logs: ReconDiscrepancyLog[];
}

const ReconDiscrepancyPayoutItemSchema = new Schema({
    paidAmount: {
        type: Number,
        required: true,
    },
    payoutType: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
        required: true,
    },
    settledAt: {
        type: Date,
        required: true,
    },
});

const ReconDiscrepancyGatewayRecordSchema = new Schema({
    transactionAmount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    settlementTime: {
        type: Date,
        required: true,
    },
});

const ReconDiscrepancyLogSchema = new Schema({
    event: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    payoutItems: {
        type: [ReconDiscrepancyPayoutItemSchema],
    },
    gatewayRecords: {
        type: [ReconDiscrepancyGatewayRecordSchema],
    },
});

const ReconDiscrepancySchema = new Schema(
    {
        discrepancyType: {
            type: String,
            required: true,
        },

        receiptNumber: {
            type: String,
            required: true,
        },

        isResolved: {
            type: Boolean,
            required: true,
            default: false,
        },

        logs: {
            type: [ReconDiscrepancyLogSchema],
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV === 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

ReconDiscrepancySchema.index({
    discrepancyType: 1,
    receiptNumber: 1,
    isResolved: 1,
});

const ReconDiscrepancyModel = model<ReconDiscrepancy>('ReconDiscrepancy', ReconDiscrepancySchema);

export default ReconDiscrepancyModel;
