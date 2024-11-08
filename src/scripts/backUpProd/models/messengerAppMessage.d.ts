import { Model, Document } from 'mongoose';

export interface MessengerMessageInstance {
    // messenger provider
    provider?: string;
    // receive msg phone number
    phone: string;
    userId?: string;
    // the content of messenger
    templateId?: string;
    message?: string;
    templateParams?: string[];
    lang?: string;
    // the 3rd origin message id
    msgId?: string;
    // msg status: 'pending' 'success' 'failure' 'delivered' 'notDelivered'
    status: string;
    type: string;
    source: string;
    amount?: number;
    sentTime?: Date;
    sentTimes?: number;
}

export interface MessengerMessageSchema extends Document, MessengerMessageInstance {}
declare const MessengerMessage: Model<MessengerMessageSchema>;
export default MessengerMessage;
