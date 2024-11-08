import { Model, Document } from 'mongoose';

export interface ReviewInfoSchema extends Document {
  business: string;

  refType: string;

  refId: string;

  rating?: number;

  ratingCount?: number;

  priceLevel?: number;

  placeId?: string;

  modifiedTime: Date;

  createdTime: Date;
}

declare const ReviewInfo: Model<ReviewInfoSchema>;
export default ReviewInfo;
