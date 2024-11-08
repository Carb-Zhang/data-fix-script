import { Document } from 'mongoose';
export interface LogisticsJobLog {
    jobId: string;
    providerName: string;
    receiptNumber: string;
    createdTime: Date;
    operation: string;
    operator: string;
    operatorName: string;
    status?: string;
    rideType?: string;
    deliveryFee?: number;
    deliveryDistance?: number;
}
export interface LogisticsJobLogDocument extends LogisticsJobLog, Document {
    id: string;
}
declare const JobLogModel: import("mongoose").Model<LogisticsJobLogDocument, {}, {}>;
export default JobLogModel;
