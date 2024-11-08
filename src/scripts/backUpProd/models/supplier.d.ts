import { Document, Types, LeanDocument } from 'mongoose';
interface Supplier {
    business: string;
    name: string;
    contactName: string;
    phone: string;
    email: string;
    fax: string;
    website: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

export type SupplierDoc = Supplier & Document<Types.ObjectId>;

export type SupplierDocPOJO = LeanDocument<SupplierDoc>;

declare const SupplierModel: import('mongoose').Model<SupplierDoc, {}, {}>;
export default SupplierModel;
