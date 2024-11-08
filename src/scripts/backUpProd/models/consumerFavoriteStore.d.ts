import { Document } from 'mongoose';
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
declare const ConsumerFavoriteStoreModel: import("mongoose").Model<ConsumerFavoriteStoreDocument, {}, {}>;
export default ConsumerFavoriteStoreModel;
