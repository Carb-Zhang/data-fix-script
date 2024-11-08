import { Document, Types, Model } from 'mongoose';

export interface TransactionStatisticsSchema extends Document {
    businessName: string;
    receiptNumber: string;
    isCancelled: boolean;
    createTime: Date;
    updateTime: Date;
}

declare const TransactionStatistics: Model<TransactionStatisticsSchema>;
export default TransactionStatistics;
