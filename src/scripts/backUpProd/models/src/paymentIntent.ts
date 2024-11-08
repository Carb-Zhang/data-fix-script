import { model, Schema, Document } from 'mongoose';

interface PaymentIntentInterface extends Document {
    business?: string;
    storeId?: string;
    receiptNumber: string;
    incrId: number;
    paymentRecordId: string;
    amount: number;
    currency: string;
    status?: string;
    notificationACK?: boolean;
    source?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const PaymentIntent = new Schema(
    {
        business: {
            type: String,
        },
        storeId: {
            type: String,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
        incrId: {
            type: Number,
            default: 0,
        },
        paymentRecordId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        notificationACK: {
            type: Boolean,
            default: false,
        },
        source: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Success', 'Pending', 'Void', 'Failed'],
            default: 'Pending',
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    },
);
const PaymentIntentModel = model<PaymentIntentInterface>('PaymentIntent', PaymentIntent);

export default PaymentIntentModel;
