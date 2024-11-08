import { Document, Model } from 'mongoose';

export interface PendingCashbackLogSchema extends Document {
    businessName: string;
    customerId: string;
    receiptNumber: string;
    amount: number;
    defaultLoyaltyRatio: number;
    source: string;
    eventTime: Date;
}

declare const PendingCashbackLog: Model<PendingCashbackLogSchema>;
export default PendingCashbackLog;
