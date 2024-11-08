import { Document } from 'mongoose';
interface PaymentIntentInterface extends Document {
    business?: string;
    storeId?: string;
    receiptNumber: string;
    incrId: number;
    paymentRecordId: string;
    amount: number;
    currency: string;
    status?: string;
    notificationACK?: boolean;
    source?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const PaymentIntentModel: import("mongoose").Model<PaymentIntentInterface, {}, {}>;
export default PaymentIntentModel;
