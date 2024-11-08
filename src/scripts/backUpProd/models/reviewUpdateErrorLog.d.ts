import { Model, Document } from 'mongoose';

export interface ReviewUpdateErrorLogSchema extends Document {
  business: string;

  refType: string;

  refId: string;

  reason: string;

  placeId: string;

  originalError: string;

  modifiedTime: Date;

  createdTime: Date;
}

declare const ReviewUpdateErrorLog: Model<ReviewUpdateErrorLogSchema>;
export default ReviewUpdateErrorLog;
