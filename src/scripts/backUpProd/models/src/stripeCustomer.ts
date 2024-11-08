import { model, Schema, Document } from 'mongoose';

interface StripeCustomerInterface extends Document {
    userId: string;
    stripeCustomerId: string;
}

const StripeCustomer = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        stripeSite: {
            type: String,
            required: true,
        },
        stripeCustomerId: {
            type: String,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV !== 'production',
        timestamps: true,
    },
);

StripeCustomer.index({ userId: 1, stripeSite: 1, stripeCustomerId: 1 }, { unique: true });

const StripeCustomerModel = model<StripeCustomerInterface>('StripeCustomer', StripeCustomer);

export default StripeCustomerModel;
