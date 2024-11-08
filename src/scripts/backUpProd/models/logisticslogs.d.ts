import { Document, Model } from 'mongoose';

export interface LogisticsLogsSchema extends Document {
    id: string;
    name: string;
    receiptNumber: string;
    type: string;
    time: Date;
    body?: any;
    status?: string;
    rideType?: string;
    deliveryFee?: number;
    deliveryDistance?: number;
    operationType: string;
    operatorName?: string;
}

declare const LogisticsLogs: Model<LogisticsLogsSchema>;

export default LogisticsLogs;
