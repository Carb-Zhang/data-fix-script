import { Model } from 'mongoose';
import { AddressSchema } from './address';

export interface BeepAddressSchema extends AddressSchema {
    consumerId: string;
    contactName?: string;
    contactNumber?: string;
    addressName: string;
    countryCode?: string;
    comments?: string;
    isDeleted?: boolean;
}

declare const BeepAddress: Model<BeepAddressSchema>;
export default BeepAddress;
