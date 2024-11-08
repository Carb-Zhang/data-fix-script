import { Schema, Document, Types } from 'mongoose';
export interface PaymentProviderCredential {
    name: string;
    business: string;
    storeIds: string[];
    provider: string;
    secretVersion: number;
    credential: {
        vendor: string;
        merchantId?: string;
        secretKey?: string;
        ccppPublicKey?: string;
        privateKey?: string;
        privateKeyPhrase?: string;
    };
}
export interface PaymentProviderCredentialDocument extends PaymentProviderCredential, Document<Types.ObjectId> {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}
export declare const PaymentProviderCredentialSchema: Schema<Document<any, any, any>, import("mongoose").Model<Document<any, any, any>, any, any>, undefined, {}>;
declare const PaymentProviderCredentialModel: import("mongoose").Model<PaymentProviderCredentialDocument, {}, {}>;
export default PaymentProviderCredentialModel;
