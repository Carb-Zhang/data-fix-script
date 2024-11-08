import { Document } from 'mongoose';
export interface ExtraInfo {
    isOnline?: boolean;
    receiptNumber?: string;
    employeeId?: string;
    notes?: string;
}
export interface PointInfo {
    pointId: string;
    changeAmount: number;
}
export interface PointChangeLog {
    merchantName: string;
    customerId: string;
    type: string;
    changeAmount: number;
    eventTime: Date;
    points: PointInfo[];
    extraInfo?: ExtraInfo;
}
export interface PointChangeLogDocument extends PointChangeLog, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}
declare const PointChangeLogModel: import("mongoose").Model<PointChangeLogDocument, {}, {}>;
export default PointChangeLogModel;
