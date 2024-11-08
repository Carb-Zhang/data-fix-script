import { Schema, Document, Types } from 'mongoose';
interface ExtraInfo {
    purchasedId?: string;
    smsCount?: number;
    campaignName?: string;
    campaignId?: string;
    campaignJobLaunchId?: string;
    campaignJobId?: string;
    ticketId?: string;
    currency?: string;
    paidAmount?: number;
}
export interface SmsCreditLog {
    business: string;
    eventType?: string;
    source?: string;
    title: string;
    smsCreditChange?: number;
    lockedSmsCreditsChange?: number;
    smsCreditsBalance?: number;
    extraInfo?: ExtraInfo;
    country?: string;
    smsCreditsAvgCost?: number;
    eventTime?: Date;
}
export interface SmsCreditLogDocument extends SmsCreditLog, Document<Types.ObjectId> {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}
export declare const SmsCreditLogSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
declare const SmsCreditLogModel: import("mongoose").Model<SmsCreditLogDocument, {}, {}>;
export default SmsCreditLogModel;
