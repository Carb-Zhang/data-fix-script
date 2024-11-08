import { Schema, model, Document } from 'mongoose';

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

const attachmentSchema = new Schema({
    url: { type: String },
    fileName: { type: String },
    fileKey: { type: String },
});

export type CommentType = 'orderIST';

export const CommentType = {
    ORDER_IST: 'orderIST',
};

const CommentSchema = new Schema(
    {
        refId: { type: String, required: true },
        type: { type: String, enum: Object.values(CommentType), required: true },
        userId: String,
        userName: String,
        userEmail: String,
        userAvatar: String,
        content: String,
        attachments: { type: [attachmentSchema], default: [] },
        isDeleted: { type: Boolean, default: false },
    },
    {
        autoIndex: process.env.NODE_ENV !== 'production',
        timestamps: {
            updatedAt: 'modifiedTime',
            createdAt: 'createdTime',
        },
    },
);

CommentSchema.index({ refId: 1 });

const CommentModel = model<CommentDocument>('comment', CommentSchema);
export default CommentModel;
