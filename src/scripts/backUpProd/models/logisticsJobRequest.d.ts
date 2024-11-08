import { Document } from 'mongoose';
export interface LogisticsRequest {
    receiptNumber: string;
    time: Date;
    body: string;
    isPreOrder?: boolean;
    isCancelled?: boolean;
    isSendOnDemandRequest?: boolean;
    status?: string;
}
export interface LogisticsRequestDocument extends LogisticsRequest, Document {
    id: string;
}
declare const LogisticsRequestModel: import("mongoose").Model<LogisticsRequestDocument, {}, {}>;
export default LogisticsRequestModel;
