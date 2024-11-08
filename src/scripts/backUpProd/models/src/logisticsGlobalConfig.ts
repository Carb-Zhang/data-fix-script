import { Document, Schema, model } from 'mongoose';

export interface LogisticsGlobalConfig {
    enablePreorder: boolean;
    enableOnfleetUrgentMode: boolean;
}

export interface LogisticsGlobalConfigDocument extends LogisticsGlobalConfig, Document {
    id: string;
}

const LogisticsGlobalConfigSchema = new Schema(
    {
        enablePreorder: {
            type: Boolean,
        },
        enableOnfleetUrgentMode: {
            type: Boolean,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

const LogisticsGlobalConfigModel = model<LogisticsGlobalConfigDocument>(
    'LogisticsGlobalConfig',
    LogisticsGlobalConfigSchema,
);
export default LogisticsGlobalConfigModel;
