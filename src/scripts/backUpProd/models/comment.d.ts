import { Document } from 'mongoose';
export interface Attachment {
    url?: string;
    fileName?: string;
    fileKey?: string;
}
export interface AttachmentDocument extends Attachment, Document {
    id: string;
}
export interface Comment {
    refId: string;
    type: CommentType;
    userId?: string;
    userName?: string;
    userEmail?: string;
    userAvatar?: string;
    content?: string;
    attachments?: Attachment[] | AttachmentDocument[];
    isDeleted?: boolean;
}
export interface CommentDocument extends Comment, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}
export declare type CommentType = 'orderIST';
export declare const CommentType: {
    ORDER_IST: string;
};
declare const CommentModel: import('mongoose').Model<CommentDocument, {}>;
export default CommentModel;
