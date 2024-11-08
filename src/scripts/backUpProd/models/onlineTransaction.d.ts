import { Document, Model } from 'mongoose';
import { StoreSchema } from './store.js';
import { TransactionBaseSchema } from './transactionBase';
import { AddressSchema } from './address';
import { LocationSchema } from './location';

export interface AddressBaseSchema extends AddressSchema {
    addressId?: string;
}

export interface PickupSchema extends Document {
    store?: StoreSchema;
}

export interface DeliveryMethodInfoSchema extends Document {
    shippingZoneId?: string;

    shippingZoneName?: string;

    deliveryMethodId?: string;

    deliveryMethodName?: string;

    rate?: number;

    minShippingTime?: number;

    maxShippingTime?: number;

    shippingTimeUnit?: string;

    isFree?: boolean;
}

export interface DeliverySchema extends Document {
    courier?: string;

    jobId?: string;

    trackingId?: string;

    trackingUrl?: string;

    shippingFee?: number;

    deliveryMethodInfo?: DeliveryMethodInfoSchema;

    address?: AddressBaseSchema;

    comments?: string;

    useStorehubLogistics?: boolean;

    driverPhone?: string;

    rideTypeMerchantSetup?: string;

    bestLastMileETA?: Date;

    worstLastMileETA?: Date;

    deliveryDistance?: number;

    deliveryDistanceUnit?: string;
}

export interface ContactDetailSchema extends Document {
    email?: string;

    name?: string;

    phone?: string;

    info?: any;
}

export interface SubOrder {
    comments?: string;
    submitId: string;
    submittedTime: Date;
    isPrinted?: boolean;
    printedTime?: Date;
    submittedBy?: string;
    submittedFrom: string;
    submittedByPhone?: string;
}

export interface SubOrderSchema extends Document, SubOrder { }

export interface MerchantSettingsSchema {
    includingTaxInDisplay?: boolean;
    enableServiceCharge?: boolean;
    serviceChargeRate?: number;
    serviceChargeTax?: string;
    enableCashback?: boolean;
}

export interface OrderDisplayFields {
    subtotal: number;
    discount: number;
    serviceCharge: number;
    tax: number;
    total: number;
}

export interface KdsSyncInfoSchema extends Document {
    syncTime: Date;
    syncRegisterId: string;
}

export interface OnlineTransactionSchema extends TransactionBaseSchema {
    consumerId?: string;

    isPaidZero?: boolean;

    sessionId?: string;

    status: string;

    business: string;

    shippingType?: string;

    shippingFee?: number;

    shippingFeeDiscount?: number;

    contactDetail?: ContactDetailSchema;

    pickupInformation?: PickupSchema[];

    deliveryInformation?: DeliverySchema[];

    expectDeliveryDateFrom?: Date;

    expectDeliveryDateTo?: Date;

    billingAddress?: AddressBaseSchema;

    pendingPaymentStartTime?: Date;

    proofFiles?: string[];

    clientId?: string;

    deviceId?: string;

    isDisbursed?: boolean;

    fromLocation?: LocationSchema;

    createdVoucherCodes?: string[];

    voucherValidDays?: number;

    fulfillDate?: Date;

    pickupDate?: Date;

    orderSource?: string;

    delayReason?: string;

    delayDetail?: string;

    isNextDayPreOrder?: boolean;

    cancelReason?: string;

    cancelReasonDetail?: string;

    originalShippingType?: string;

    paidDate?: Date;

    pendingClaimCashback?: number;

    subOrders?: SubOrderSchema[];

    isPayLater?: boolean;

    subtotalTax?: number;

    smallOrderFee?: number;

    smallOrderFeeTax?: number;

    containerFee?: number;

    containerFeeTax?: number;

    platformServiceFee?: number;

    platformServiceFeeTax?: number;

    revenue?: number;

    otherFee?: number;

    merchantInfo?: MerchantSettingsSchema;

    changedToOfflinePaymentNotifiedSMSCount?: number;

    notifiedSelfPickupSMSCount?: number;

    enabledGoogleReviewSMSCampaign?: boolean;

    printKitchenDocket?: boolean;

    printReceipt?: boolean;

    display?: OrderDisplayFields;

    productsManualDiscount?: number;

    isSplittedFromReceiptNumber?: string;

    isSplittedBy?: string;

    onlineBIRDate?: Date;

    deductInventoryMethod?: string;

    version?: number;

    kdsSyncInfo?: KdsSyncInfoSchema;

    urlType?: string;

    cancelledDate?: Date,
}

declare const OnlineTransaction: Model<OnlineTransactionSchema>;
export default OnlineTransaction;
