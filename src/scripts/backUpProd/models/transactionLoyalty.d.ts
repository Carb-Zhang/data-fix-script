import { Document, Types, Model } from 'mongoose';

export interface TransactionLoyaltySchema extends Document {
    businessName: string;
    receiptNumber: string;
    createTime: Date;
    updateTime: Date;
}

declare const TransactionLoyalty: Model<TransactionLoyaltySchema>;
export default TransactionLoyalty;
