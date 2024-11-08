import { Model, Document } from 'mongoose';
import { LocationSchema } from './location';

export default Model;

export interface AddressSchema extends Document {
  name?: string;

  phone?: string;

  address?: string;

  city?: string;

  postCode?: string;

  state?: string;

  country?: string;

  companyName?: string;

  addressDetails?: string;

  deliveryTo?: string;

  location?: LocationSchema;
}
