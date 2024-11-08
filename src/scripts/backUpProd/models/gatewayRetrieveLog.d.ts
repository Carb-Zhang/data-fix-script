import { Document } from 'mongoose';
interface GatewayRetrieveLogInterface extends Document {
    paymentGateway?: string;
    retrievedFrom: number;
    retrievedTo: number;
    files?: string[];
    country?: string;
    recordCount?: number;
    logType?: string;
    createdTime?: Date;
    modifiedTime?: Date;
}
declare const GatewayRetrieveLogModel: import("mongoose").Model<GatewayRetrieveLogInterface, {}, {}>;
export default GatewayRetrieveLogModel;
