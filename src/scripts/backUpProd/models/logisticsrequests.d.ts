import { Document, Model } from 'mongoose';

export interface LogisticsRequestsSchema extends Document {
    receiptNumber: string;
    time: Date;
    body: string;
    isSendOnDemandRequest?: boolean;
    status?: string;
    isPreOrder?: Boolean;
    isCancelled?: Boolean;
}

declare const LogisticsRequests: Model<LogisticsRequestsSchema>;

export default LogisticsRequests;
