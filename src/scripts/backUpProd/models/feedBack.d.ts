import { Document, Model } from 'mongoose';

export interface FeedBackSchema extends Document {
    reasonCode?: string[];
    notes?: string;
    reporterType?: string;
    logisticsProvider?: string;
    receiptNumber?: string;
    status?: number;
    image?: string;
    email?: string;
    createdTime?: Date;
    modifiedTime?: Date;
}

declare const FeedBack: Model<FeedBackSchema>;
export default FeedBack;
