import { Model, Document } from 'mongoose';
declare const QrCodeRecord: Model<QrCodeRecordSchema>;
export default QrCodeRecord;

export interface QrCodeRecordInstance {
    businessName: string;
    storeId: string;
    designType: string;
    tableType: string;
    tableList: string[];
    status: string;
    fileId: string;
}

export interface QrCodeRecordSchema extends Document, QrCodeRecordInstance {}
