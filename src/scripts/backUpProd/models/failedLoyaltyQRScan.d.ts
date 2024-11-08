import { Document, Model } from 'mongoose';

export interface FailedLoyaltyQRScanSchema extends Document {
    businessName: string;
    customerId: string;
    receiptNumber: string;
    reason: string;
    eventTime: Date;
}

declare const FailedLoyaltyQRScan: Model<FailedLoyaltyQRScanSchema>;
export default FailedLoyaltyQRScan;
