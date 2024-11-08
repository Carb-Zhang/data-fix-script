import { Model, Document } from 'mongoose';
import { ObjectId } from 'bson';

declare const IpadLayout: Model<IpadLayoutSchema>;
export default IpadLayout;

export interface IpadLayoutSchema extends Document {
    business: string;

    name: string;

    categories: CategoriesSchema[];

    appVersion: number;
}

export interface CategoriesSchema {
    categoryId: string;

    name: string;

    order: number;
}
