import { Document } from 'mongoose';
export interface ShareInfoRequest {
    merchantName: string;
    expiredDate?: Date;
    scannedDate?: Date;
    source?: string;
    consumerId?: string;
    customerId?: string;
    isNewCustomer?: boolean;
    sharedInfoDate?: Date;
    registerId?: string;
    storeId?: string;
    employeeId?: string;
    isNewMember?: boolean;
}
export interface ShareInfoRequestDocument extends ShareInfoRequest, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}
declare const ShareInfoRequestModel: import('mongoose').Model<ShareInfoRequestDocument, {}, {}>;
export default ShareInfoRequestModel;
