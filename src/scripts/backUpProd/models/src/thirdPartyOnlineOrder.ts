import { Schema, Document, model } from 'mongoose';

export interface ThirdPartyOnlineOrderDocument extends Document {
    name: string;
}

const ThirdPartyOnlineOrderSchema = new Schema(
    {
        channel: {
            type: Number,
            required: true,
        },
        orderId: {
            type: String,
            required: true,
        },
        content: {
            type: Object,
            required: true,
        },
        isCancellationNotTakeEffect: Boolean,
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

const ThirdPartyOnlineOrderModel = model<ThirdPartyOnlineOrderDocument>('thirdPartyOnlineOrder', ThirdPartyOnlineOrderSchema);

export default ThirdPartyOnlineOrderModel;