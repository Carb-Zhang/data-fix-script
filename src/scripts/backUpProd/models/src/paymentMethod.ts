import { model, Schema, Document } from 'mongoose';

interface CreditCardInterface extends Document {
    maskedNumber: string;
    cardholderName?: string;
    expirationMonth: string;
    expirationYear: string;
    cardType: string;
    createdAt: Date;
    updatedAt: Date;
}

interface PaymentMethodInterface extends Document {
    userId: string;
    country: string;
    provider: string;
    cardInfo?: CreditCardInterface;
    cardToken: string;
    bindedReceiptNumber: string;
    uniqueIdentifier: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const CreditCard = new Schema(
    {
        maskedNumber: {
            type: String,
            required: true,
        },
        cardholderName: {
            type: String,
        },
        expirationMonth: {
            type: String,
            required: true,
        },
        expirationYear: {
            type: String,
            required: true,
        },
        cardType: {
            type: String,
        },
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

const PaymentMethod = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
        cardInfo: {
            type: CreditCard,
        },
        cardToken: {
            type: String,
            required: true,
        },
        bindedReceiptNumber: {
            type: String,
            required: true,
        },
        uniqueIdentifier: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Success', 'Pending', 'Deleted'],
            default: 'Pending',
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);

PaymentMethod.index({ userId: 1 });
PaymentMethod.index({ provider: 1 });
PaymentMethod.index({ status: 1 });
PaymentMethod.index({ bindedReceiptNumber: 1 });
PaymentMethod.index({ userId: 1, country: 1, uniqueIdentifier: 1 }, { unique: true });
PaymentMethod.index({ userId: 1, country: 1, provider: 1, status: 1 });

const PaymentMethodModel = model<PaymentMethodInterface>('PaymentMethod', PaymentMethod);

export default PaymentMethodModel;
