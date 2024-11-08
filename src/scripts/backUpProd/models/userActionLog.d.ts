import { Document } from 'mongoose';

export interface UserActionLog {
    business: string;
    storeId?: string;
    registerId?: number;
    time: Date;
    user?: string;
    action: string;
    notes?: string;
    source?: string;
    ipAddress?: string;
    additionalInfo?: string;
}

export interface UserActionLogDocument extends UserActionLog, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

declare const UserActionLogModel: import('mongoose').Model<UserActionLogDocument, {}>;
export default UserActionLogModel;
