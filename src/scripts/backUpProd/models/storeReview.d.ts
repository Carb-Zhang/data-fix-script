import { Schema, Document } from 'mongoose';
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
export declare const StoreReviewSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
declare const StoreReviewModel: import("mongoose").Model<StoreReviewDocument, {}, {}>;
export default StoreReviewModel;
