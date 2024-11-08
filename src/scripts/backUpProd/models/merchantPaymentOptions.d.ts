import { Schema, Document } from 'mongoose';
export interface MerchantPaymentOptions {
    business: string;
    source: string;
    shippingTypes: string[];
    isEnabled: boolean;
    disablingDisplayType: string;
    whiteListMode: boolean;
    paymentOptionNames: string[];
}
export interface MerchantPaymentOptionsDocument extends MerchantPaymentOptions, Document {
    id: string;
    createdTIme: Date;
    modifiedTime: Date;
}
export declare const MerchantPaymentOptionsSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
export declare const MerchantPaymentOptionsModel: import("mongoose").Model<MerchantPaymentOptionsDocument, {}, {}>;
export default MerchantPaymentOptionsModel;
