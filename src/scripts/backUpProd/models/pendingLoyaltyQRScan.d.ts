import { Document, Model } from 'mongoose';

export interface PendingLoyaltyQRScanSchema extends Document {
    businessName: string;
    receiptNumber: string;
    customerId: string;
    processed: boolean;
    createdTime?: Date;
}

declare const PendingLoyaltyQRScan: Model<PendingLoyaltyQRScanSchema>;
export default PendingLoyaltyQRScan;
