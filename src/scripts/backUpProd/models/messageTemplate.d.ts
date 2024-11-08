import { Model, Document, Schema } from 'mongoose';

export interface MessageTemplateSchema extends Document {
    // who's template
    business: string;
    name: string;
    // example: your captcha is ${param1}
    content: string;
    // example: ['param1']
    parameters:  string [];
    isDeleted: boolean;
}
declare const MessageTemplate: Model<MessageTemplateSchema>;

export default MessageTemplate;