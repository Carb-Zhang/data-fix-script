import { Model, Document } from 'mongoose';
import { ObjectId } from 'bson'

export interface SerialNumberLog {

    timestamp: Date;

    eventType: string;

    storeId: string;

    employeeId?: string;
    
    docRefId?: string;
}

export interface SerialNumberSchema extends Document {

    business: string;

    productId: string;

    storeId: string;

    serialNum: string;

    logs?: SerialNumberLog[];
}

declare const SerialNumber: Model<SerialNumberSchema>;
export default SerialNumber;
