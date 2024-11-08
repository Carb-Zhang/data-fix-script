import { Document } from 'mongoose';
export interface PaymentRecordInterface {
    receiptNumber: string;
    paymentRecordId: string;
    paymentId?: string;
    amount: number;
    currency: string;
    provider: string;
    providerAccountId?: string;
    providerOption?: string;
    status?: string;
    business?: string;
    storeId?: string;
    notificationACK?: boolean;
    source?: string;
    lastErrorCode?: string;
    lastError?: string;
    isInternal?: boolean;
    issuerCountry?: string;
    issuerName?: string;
    cardType?: string;
    cancelledAt?: string;
    createdAt?: Date;
    updatedAt?: Date;
    nonce?: string;
    redirectURL?: string;
    webhookURL?: string;
    paymentType?: string;
    shippingtype?: string;
    metadata?: Record<string, any>;
    refundId?: string;
    refundRequestId?: string;
    paymentOption?: string;
    userId?: string;
    cardToken?: string;
    cvcToken?: string;
    paymentMethodId?: string;
    payActionWay?: string;
    cardholderName?: string;
    encryptedCardInfo?: string;
}
interface PaymentRecordDocument extends PaymentRecordInterface, Document {
    createdTime: Date;
    modifiedTime: Date;
}
declare const PaymentRecordModel: import("mongoose").Model<PaymentRecordDocument, {}, {}>;
export default PaymentRecordModel;
