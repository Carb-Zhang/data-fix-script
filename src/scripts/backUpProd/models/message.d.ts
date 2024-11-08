import { Model, Document } from 'mongoose';

export interface MessageInstance {
    // sms provider
    provider?: string;
    // who send the msg
    business?: string;
    // receive msg phone number
    phone: string;
    // the content of sms
    templateId?: string;
    message: string;
    // the 3rd origin message id
    msgId?: string;
    // the 3rd id
    msgIds?: string[];
    // msg status: 'pending' 'success' 'failure' 'delivered' 'notDelivered'
    status: string;
    type: string;
    source: string;
    units?: number;
    amount?: number;
    rate?: number;
    sentTime?: Date;
    sentTimes?: number;
}

export interface MessageSchema extends Document, MessageInstance {}
declare const Message: Model<MessageSchema>;
export default Message;
