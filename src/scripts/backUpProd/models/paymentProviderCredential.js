"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProviderCredentialSchema = void 0;
const mongoose_1 = require("mongoose");
const CredentialSchema = new mongoose_1.Schema({
    vendor: {
        type: String,
        enum: ['ccpp', 'getz'],
        required: true,
    },
    // ccpp: merchantId, secretKey, ccppPublicKey, privateKey(Base64), privateKeyPhrase
    // getz: merchantId, secretKey
    merchantId: { type: String },
    secretKey: { type: String },
    ccppPublicKey: { type: String },
    privateKey: { type: String },
    privateKeyPhrase: { type: String },
});
exports.PaymentProviderCredentialSchema = new mongoose_1.Schema({
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
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
exports.PaymentProviderCredentialSchema.index({ business: 1, storeIds: 1, provider: 1 });
const PaymentProviderCredentialModel = (0, mongoose_1.model)('PaymentProviderCredential', exports.PaymentProviderCredentialSchema);
exports.default = PaymentProviderCredentialModel;
