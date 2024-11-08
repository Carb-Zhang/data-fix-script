import { Document } from 'mongoose';
interface CreditCardInterface extends Document {
    maskedNumber: string;
    cardholderName?: string;
    expirationMonth: string;
    expirationYear: string;
    cardType: string;
    createdAt: Date;
    updatedAt: Date;
}
interface PaymentMethodInterface extends Document {
    userId: string;
    country: string;
    provider: string;
    cardInfo?: CreditCardInterface;
    cardToken: string;
    bindedReceiptNumber: string;
    uniqueIdentifier: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const PaymentMethodModel: import("mongoose").Model<PaymentMethodInterface, {}, {}>;
export default PaymentMethodModel;
