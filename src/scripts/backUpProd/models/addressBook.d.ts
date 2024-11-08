import { Model } from 'mongoose';
import { AddressSchema } from './address';

export interface AddressBookSchema extends AddressSchema {
    userId: string
}

declare const AddressBook: Model<AddressBookSchema>;
export default AddressBook;