import { Model, Document } from 'mongoose';

declare const PriceBook: Model<PriceBookSchema>;
export default PriceBook;

export interface PriceBookSchema extends Document {
    business: string;

    name: string;

    appliedStores: string[];

    appliedCustomerTags: string[];

    ordering: number;

    enableServiceCharge: boolean;

    serviceChargeRate: number;

    serviceChargeTax: string;
}
