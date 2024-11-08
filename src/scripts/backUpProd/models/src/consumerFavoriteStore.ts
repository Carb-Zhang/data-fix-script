import { Schema, Document, model } from 'mongoose';

export interface ConsumerFavoriteStore {
    consumerId: string;
    business: string;
    storeId: string;
    purchaseTimes?: number;
    createdTime: Date;
}

export interface ConsumerFavoriteStoreDocument extends ConsumerFavoriteStore, Document {
    id: string;
}

const ConsumerFavoriteStoreSchema = new Schema(
    {
        consumerId: {
            type: String,
            required: true,
        },
        business: {
            type: String,
            required: true,
        },
        storeId: {
            type: String,
            required: true,
        },
        purchaseTimes: {
            type: Number,
            required: false,
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

ConsumerFavoriteStoreSchema.index({ consumerId: 1, business: 1, storeId: 1 }, { unique: true });
ConsumerFavoriteStoreSchema.index({ consumerId: 1, createdTime: -1 });

const ConsumerFavoriteStoreModel = model<ConsumerFavoriteStoreDocument>(
    'ConsumerFavoriteStore',
    ConsumerFavoriteStoreSchema,
);

export default ConsumerFavoriteStoreModel;
