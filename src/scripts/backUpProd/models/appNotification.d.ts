import { Model, Document } from 'mongoose';

export interface TransactionAdditionalInfoInstance {
    source: string;
    businessName: string;
    receiptNumber: string;
}

export interface TransactionAdditionalInfoSchema
    extends TransactionAdditionalInfoInstance,
        Document {}

export interface AppNotificationInstance {
    receiver: string;
    title: string;
    subtitle: string;
    img?: string;
    status: string;
    type: string;
    additionalInfo: TransactionAdditionalInfoSchema | any;
    createdTime?: Date;
}

export interface AppNotificationSchema extends AppNotificationInstance, Document {}

declare const AppNotification: Model<AppNotificationSchema>;
export default AppNotification;
