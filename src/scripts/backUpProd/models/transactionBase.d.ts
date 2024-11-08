import { Document, Types, Model } from 'mongoose';
import { ItemSchema } from './item';
import { AppliedPromotionSchema } from './appliedPromotion';
import { PurchasedItemOptionSchema } from './purchasedItemOption';
import { LocationSchema } from './location';
import { CalculationFieldsSchema } from './calculationFields';

export interface ReturnProcessSchema {
    productId: Types.ObjectId;

    skuNumber?: string;

    title: string;

    actionRequired: boolean;

    inventoryAction?: string;

    comment?: string;

    failedToUpdateInventory?: boolean;

    selectedOptions?: PurchasedItemOptionSchema[];

    completedTime?: Date;

    sn?: string;
}

export interface ManualApproveInfoSchema {
    approver?: string;

    approveDate?: Date;

    approveReason?: string;
}

export interface PaymentSchema {
    amount: number;

    paymentMethod: string;

    isDeposit?: boolean;

    cashTendered?: number;

    roundedAmount?: number;

    subType?: string;

    mPOSTxnId?: string;

    isOnline?: boolean;

    paymentGateway?: string;

    cardName?: string;

    cardNo?: string;

    manualApproveInfo?: ManualApproveInfoSchema;

    paymentProvider?: string;

    paymentProviderMID?: string;
}

export interface LoyaltyDiscountSchema {
    loyaltyType?: string;
    displayDiscount?: number;
    spentValue?: number;
}

export interface AppliedVoucherSchema {
    voucherId: string;
    voucherCode: string;
    value: number;
    cost: number;
    purchaseChannel?: string;
    coveredBySH?: boolean;
}

export interface IAddonBirCompliance {
    discountType: string;
    athleteAndCoachDiscount?: number;
    medalOfValorDiscount?: number;
    soloParentDiscount?: number;
    collectedInfo: any;
}

export interface TransactionBaseSchema extends Document {
    business: string;

    storeId: Types.ObjectId;

    transactionId: string;

    registerId?: Types.ObjectId;

    registerNumber?: number;

    employeeNumber?: string;

    items: ItemSchema[];

    loyaltyDiscounts?: LoyaltyDiscountSchema[];

    enableCashback?: boolean;

    serviceChargeRate?: number;

    createdTime: Date;

    modifiedTime: Date;

    total: number;

    subtotal: number;

    discount: number;

    promotions?: AppliedPromotionSchema[];

    tax?: number;

    roundedAmount?: number;

    paymentMethod?: string;

    originalReceiptNumber?: string;

    transactionType?: string;

    comment?: string;

    failedToUpdateInventory?: boolean;

    failedToUpdateLoyalty?: boolean;

    returnProcess?: ReturnProcessSchema[];

    returnStatus?: string;

    receiptNumber?: string;

    sequenceNumber?: number;

    invoiceSeqNumber?: number;

    isCancelled?: boolean;

    cancelledBy?: string;

    cancelledAt?: Date;

    customerId?: string;

    depositAmount?: number;

    pickUpDate?: Date;

    preOrderDate?: Date;

    preOrderBy?: string;

    preOrderId?: string;

    returnReason?: string;

    emailReceipt?: boolean;

    cashTendered?: number;

    cost?: number;

    appVersion?: string;

    serviceCharge?: number;

    payments?: PaymentSchema[];

    headcount?: number;

    seniorsCount?: number;

    pwdCount?: number;

    totalDeductedTax?: number;

    seniorDiscount?: number;

    pwdDiscount?: number;

    taxableSales?: number;

    taxExemptedSales?: number;

    zeroRatedSales?: number;

    serviceChargeTax?: number;

    pax?: number;

    minNo?: string;

    location?: LocationSchema;

    channel?: number;

    tableId?: string;

    otherReason?: string;

    pickUpId?: string;

    appliedVoucher?: AppliedVoucherSchema;

    takeawayCharges?: number;

    salesChannel?: number;

    fixedFee?: number;

    addonBirCompliance?: IAddonBirCompliance;

    seqNumberCreatedTime?: Date;

    failedToSendMembershipStatsQueue?: boolean;

    lastUploadedTime?: Date;

    pendingTime?: Date;

    servedTime?: Date;
    
    calculation?: CalculationFieldsSchema;

    eInvoiceInfo?: {
        eInvoiceStatus: string;
        statusUpdatedAt: Date;
        documentType: string;
        documentId: string;
    };
}
