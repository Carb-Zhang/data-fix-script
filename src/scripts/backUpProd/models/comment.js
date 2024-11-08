"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentType = void 0;
const mongoose_1 = require("mongoose");
const attachmentSchema = new mongoose_1.Schema({
    url: { type: String },
    fileName: { type: String },
    fileKey: { type: String },
});
exports.CommentType = {
    ORDER_IST: 'orderIST',
};
const CommentSchema = new mongoose_1.Schema({
    refId: { type: String, required: true },
    type: { type: String, enum: Object.values(exports.CommentType), required: true },
    userId: String,
    userName: String,
    userEmail: String,
    userAvatar: String,
    content: String,
    attachments: { type: [attachmentSchema], default: [] },
    isDeleted: { type: Boolean, default: false },
}, {
    autoIndex: process.env.NODE_ENV !== 'production',
    timestamps: {
        updatedAt: 'modifiedTime',
        createdAt: 'createdTime',
    },
});
CommentSchema.index({ refId: 1 });
const CommentModel = (0, mongoose_1.model)('comment', CommentSchema);
exports.default = CommentModel;
