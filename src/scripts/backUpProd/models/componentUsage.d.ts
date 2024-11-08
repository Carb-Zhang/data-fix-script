import { Document } from 'mongoose';

export interface ComponentUsageSchema extends Document {
    productId: string;

    quantity: number;

    lockedQuantity?: number;

    lockedDate?: Date;
}
