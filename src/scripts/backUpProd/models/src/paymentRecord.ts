import { model, Schema, Document } from 'mongoose';

export interface PaymentRecordInterface {
    receiptNumber: string;
    paymentRecordId: string;
    paymentId?: string;
    amount: number;
    currency: string;
    provider: string;
    providerAccountId?: string;
    providerOption?: string;
    status?: string;
    business?: string;
    storeId?: string;
    notificationACK?: boolean;
    source?: string;
    lastErrorCode?: string;
    lastError?: string;
    isInternal?: boolean;
    issuerCountry?: string;
    issuerName?: string;
    cardType?: string;
    cancelledAt?: string;
    createdAt?: Date;
    updatedAt?: Date;
    nonce?: string;
    redirectURL?: string;
    webhookURL?: string;
    paymentType?: string;
    shippingtype?: string;
    metadata?: Record<string, any>;
    refundId?: string; // refund recordId of provider
    refundRequestId?: string;

    // payment info for stripe card
    paymentOption?: string;
    userId?: string;
    cardToken?: string;
    cvcToken?: string;
    paymentMethodId?: string;

    // payment info for 2c2p card
    payActionWay?: string;
    cardholderName?: string;
    encryptedCardInfo?: string;
}

interface PaymentRecordDocument extends PaymentRecordInterface, Document {
    createdTime: Date;
    modifiedTime: Date;
}

const PaymentRecord = new Schema(
    {
        receiptNumber: {
            type: String,
            required: true,
        },
        paymentRecordId: {
            type: String,
            required: true,
        },
        paymentId: {
            type: String,
        },
        refundId: {
            type: String,
        },
        refundRequestId: {
            type: String,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
        providerAccountId: {
            type: String,
        },
        providerOption: {
            type: String,
        },
        business: {
            type: String,
        },
        storeId: {
            type: String,
        },
        status: {
            type: String,
            default: 'Pending',
        },
        notificationACK: {
            type: Boolean,
        },
        source: {
            type: String,
        },
        lastErrorCode: {
            type: String,
        },
        lastError: {
            type: String,
        },
        isInternal: { type: Boolean },
        issuerCountry: { type: String },
        issuerName: { type: String },
        cardType: { type: String },
        cancelledAt: {
            type: Date,
        },
        nonce: {
            type: String,
        },
        redirectURL: {
            type: String,
        },
        webhookURL: {
            type: String,
        },
        paymentOption: {
            type: String,
        },
        userId: {
            type: String,
        },
        cardToken: {
            type: String,
        },
        cvcToken: {
            type: String,
        },
        paymentMethodId: {
            type: String,
        },
        payActionWay: {
            type: String,
        },
        cardholderName: {
            type: String,
        },
        encryptedCardInfo: {
            type: String,
        },
        paymentType: {
            type: String,
        },
        shippingtype: {
            type: String,
        },
        metadata: {
            type: Schema.Types.Mixed,
        },
    },
    {
        autoIndex: process.env.NODE_ENV !== 'production',
        timestamps: true,
    },
);

PaymentRecord.index({ receiptNumber: 1 });
PaymentRecord.index({ paymentRecordId: 1 });
PaymentRecord.index({ provider: 1, providerAccountId: 1 });
PaymentRecord.index({ providerOption: 1 });
PaymentRecord.index({ status: 1 });
PaymentRecord.index(
    { source: 1 },
    {
        sparse: true,
    },
);
PaymentRecord.index(
    {
        paymentId: 1,
    },
    {
        sparse: true,
    },
);
PaymentRecord.index(
    {
        cancelledAt: 1,
    },
    {
        sparse: true,
    },
);
PaymentRecord.index(
    {
        issuerCountry: 1,
    },
    {
        sparse: true,
    },
);

const PaymentRecordModel = model<PaymentRecordDocument>('PaymentRecord', PaymentRecord);

export default PaymentRecordModel;
