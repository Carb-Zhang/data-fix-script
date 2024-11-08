import { Schema, Document, model } from 'mongoose';

export interface StoreReview {
    business: string;
    receiptNumber: string;
    storeId: string;
    placeId?: string;
    rating?: number;
    comments?: string;
    allowMerchantContact?: boolean;
    contactName?: string;
    contactPhone?: string;
    clickCount?: number;
}

export interface StoreReviewDocument extends StoreReview, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

export const StoreReviewSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
        storeId: {
            type: String,
            required: true,
        },
        placeId: {
            type: String,
        },
        rating: {
            type: Number,
        },
        comments: {
            type: String,
        },
        allowMerchantContact: {
            type: Boolean,
        },
        contactName: {
            type: String,
        },
        contactPhone: {
            type: String,
        },
        clickCount: {
            type: Number,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

StoreReviewSchema.index({ business: 1, createdTime: -1, storeId: 1, rating: 1 });
StoreReviewSchema.index({ receiptNumber: 1 }, { unique: true });
StoreReviewSchema.index({ storeId: 1 });

const StoreReviewModel = model<StoreReviewDocument>('StoreReview', StoreReviewSchema);

export default StoreReviewModel;
