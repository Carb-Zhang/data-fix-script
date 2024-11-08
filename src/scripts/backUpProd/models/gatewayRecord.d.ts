import { Document } from 'mongoose';
interface GatewayRecordInterface extends Document {
    receiptNumber?: string;
    paymentGateway?: string;
    transactionId?: string;
    fee?: number;
    transactionAmount?: number;
    net?: number;
    transferStatus?: string;
    settlementTime?: Date;
    country?: string;
    transactionType?: string;
    reconStatus: string;
    createdTime: Date;
    modifiedTime: Date;
    paymentRecordId?: string;
}
declare const GatewayRecordModel: import("mongoose").Model<GatewayRecordInterface, {}, {}>;
export default GatewayRecordModel;
