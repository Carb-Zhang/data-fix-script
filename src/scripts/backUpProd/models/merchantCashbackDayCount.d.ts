import { Document, Model } from 'mongoose';

export interface MerchantCashbackDayCountSchema extends Document {
    businessName: string;
    dateStr: string;
    count: number;
}

declare const MerchantCashbackDayCount: Model<MerchantCashbackDayCountSchema>;
export default MerchantCashbackDayCount;
