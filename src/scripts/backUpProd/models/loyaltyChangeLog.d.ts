import { Document, Types, Model } from 'mongoose';

export interface LoyaltyChangeLogSchema extends Document {
    business: string;

    customerId: string;

    eventTime: Date;

    eventType: string;

    amount: number;

    transactionId?: string;

    receiptNumber: string;

    loyaltyPerProduct?: any;

    defaultLoyaltyRatio?: number;

    dataVersion?: number;

    source?: string;

    rewardType?: string;
}

declare const LoyaltyChangeLog: Model<LoyaltyChangeLogSchema>;
export default LoyaltyChangeLog;
