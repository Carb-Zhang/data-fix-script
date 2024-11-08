import { model, Schema, Document } from 'mongoose';

interface ReconExecLog extends Document {
    createdTime?: Date;
    modifiedTime?: Date;
    execStatus: string;
    startDate: Date;
    endDate: Date;
    error?: string;
}

const ReconExecLogSchema = new Schema(
    {
        execStatus: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        error: {
            type: String,
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

const ReconExecLogModel = model<ReconExecLog>('ReconExecLog', ReconExecLogSchema);

export default ReconExecLogModel;
