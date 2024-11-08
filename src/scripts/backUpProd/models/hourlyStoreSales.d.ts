import { Model, Document } from 'mongoose';
import { ObjectId } from 'bson';

export interface HourlyStoreSalesSchema extends Document {
    business: string;
    date: number;
    storeId: ObjectId;
    sales: number;
    returns: number;
    tax: number;
    rounding: number;
    cost: number;
    transactions: number;
    transactionItems: number;
    serviceCharge: number;
    totalPax: number;
    modifiedTime: Date;
}

declare const HourlyStoreSales: Model<HourlyStoreSalesSchema>;
export default HourlyStoreSales;
