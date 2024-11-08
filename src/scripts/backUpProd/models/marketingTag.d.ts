import { Document, Model } from 'mongoose';

export interface MarketingTag extends Document {
  tagName: string;
  businesses: string[];
  createdBy: string;
  modifiedBy: string;
  createdTime: string;
  modifiedTime: string;
}

export interface MarketingTagSchema extends MarketingTag, Document {}

declare const MarketingTagModel: Model<MarketingTagSchema>;
export default MarketingTagModel;

