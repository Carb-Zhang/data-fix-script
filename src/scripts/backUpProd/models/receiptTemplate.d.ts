import { Model, Document } from 'mongoose';
import { ObjectId } from 'bson'

export default Model;

export interface ReceiptTemplateSchema extends Document {

    businessName: string;

    name: string;

    logoData: Buffer;

    logoContentType: string;

    showBarcode: boolean;

    showStoreName: boolean;

    customerInfo: string[];

    taxName: string;

    showNotes: boolean;

    modifiedTime: string;

    isDefault: boolean;

    receiptType: string;

    poweredBy: boolean;
}
