import mongoose, { Document, Model } from 'mongoose';
import { VariationSchema, OptionValueSchema } from './product';

export interface ISharedModifierSchema extends VariationSchema {
    business: string;
    id?: string;
}
export interface SharedModifierSchema extends ISharedModifierSchema, Document {
    id?: string;
}

declare const Product: Model<SharedModifierSchema>;

export default Product;
