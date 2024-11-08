import { Schema, Document, model, Types } from 'mongoose';

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

export interface PaymentProviderCredentialDocument
    extends PaymentProviderCredential,
        Document<Types.ObjectId> {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

const CredentialSchema = new Schema({
    vendor: {
        type: String,
        enum: ['ccpp', 'getz'],
        required: true,
    },
    // ccpp: merchantId, secretKey, ccppPublicKey, privateKey(Base64), privateKeyPhrase
    // getz: merchantId, secretKey
    // gcash_mp: merchantId
    merchantId: { type: String },
    secretKey: { type: String },
    ccppPublicKey: { type: String },
    privateKey: { type: String },
    privateKeyPhrase: { type: String },
});

export const PaymentProviderCredentialSchema = new Schema(
    {
        name: {
            type: String,
        },
        business: {
            type: String,
            required: true,
        },
        storeIds: {
            type: [String],
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
        secretVersion: {
            type: Number,
            required: true,
        },
        credential: {
            type: CredentialSchema,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

PaymentProviderCredentialSchema.index({ business: 1, storeIds: 1, provider: 1 });

const PaymentProviderCredentialModel = model<PaymentProviderCredentialDocument>(
    'PaymentProviderCredential',
    PaymentProviderCredentialSchema,
);

export default PaymentProviderCredentialModel;
