import { Model, Document } from 'mongoose';

declare const SubscriptionOrder: Model<SubscriptionOrderSchema>;
export default SubscriptionOrder;

export interface SubscriptionOrderSchema extends Document {
    business: string;
    //the value is needed to be paid
    price: number;
    status: SubscriptionOrderStatus;
    action: SubscriptionOrderAction;
    planId: string;
    addons: SubscriptionOrderAddon[];
    numberOfRenewals: number;
    paymentGateway: string;
    paymentMethod: string;
    paymentId: string;
    paymentProvider: string;
    errorCode: string;
    createdTime: Date;
    updatedTime: Date;
    outdated: boolean;
    shortId: string;
    orderType: string;
    taxAmount: number;
    discountAmount: number;
}

export type SubscriptionOrderStatus =
    | 'Pending'
    | 'Expired'
    | 'Cancelled'
    | 'PaymentFailed'
    | 'PaymentSucceeded'
    | 'PaymentRecorded'
    | 'VoidRecordedPaymentFailed'
    | 'PaymentVoided'
    | 'ProcessingError'
    | 'PaymentRefunded'
    | 'Success';

export type SubscriptionOrderAction = 'Reactivate' | 'Update' | 'Renew' | 'OnceCharge';

export type SubscriptionOrderAddon = {
    id: string;
    count: number;
};

export interface SubscriptionOrderUpdate {
    status: SubscriptionOrderStatus;
    price: number;
    paymentGateway?: string;
    paymentMethod?: string;
    paymentId?: string;
    paymentProvider?: string;
    errorCode?: string;
}
