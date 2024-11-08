import { Document, Types, Model } from 'mongoose';

export interface BeepCollectionSchema extends Document {
    beepCollectionId: string;

    urlPath: string;

    displayType: string;

    image?: string;

    name: string;

    countryCode: string;

    sortWeight: number;

    status: string;

    shippingType?: string;

    tags?: string[];

    marketingTags?: string[];

    freeShipping?: boolean;

    cashbackEnabled?: boolean;

    createdBy?: string;

    merchantFile?: string;

    merchantList?: string[];

    createdTime?: Date;

    updatedTime?: Date;
}

declare const BeepCollection: Model<BeepCollectionSchema>;
export default BeepCollection;
