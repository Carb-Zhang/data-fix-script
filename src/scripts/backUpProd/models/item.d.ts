import { Types, Document } from 'mongoose';
import { AppliedPromotionSchema } from './appliedPromotion';
import { ComponentUsageSchema } from './componentUsage';
import { PurchasedItemOptionSchema } from './purchasedItemOption';
import { CalculationFieldsSchema } from './calculationFields';

export interface ItemProductInfoSchema {
    title: string;
    productId: string;
    unitPrice: number;
    productParentId?: string;
    taxCode?: string;
    taxRate?: number;
    image?: string;
    originImage?: string;
    trackInventory?: boolean;
    inventoryType?: string;
    isHalal?: boolean;
    originalDisplayPrice?: number;
    displayPrice?: number;
    tags?: string[];
    category?: string;
    isVatExempted?: boolean;
}

export interface ItemServiceChargeInfo {
    taxCode: string;
    taxRate: number;
    rate: number;
}

export interface ManualDiscount {
    type: string; // amount/percentage
    value: number;
}

export interface ItemDisplayFields {
    total?: number;
    tax?: number;
    subtotal?: number;
    discount?: number;
}

export interface ItemSchema extends Document {
    itemType?: string;

    title?: string;

    productId?: Types.ObjectId;

    quantity: number;

    subTotal: number;

    total: number;

    discount?: number;

    adhocDiscount?: number;

    loyaltyDiscount?: number;

    promotions?: AppliedPromotionSchema[];

    componentsUsages?: ComponentUsageSchema[];

    selectedOptions?: PurchasedItemOptionSchema[];

    tax?: number;

    orderingValue?: number;

    unitPrice?: number;

    cost?: number;

    notes?: string;

    taxCode?: string;

    taxableAmount?: number;

    taxExemptAmount?: number;

    zeroRatedSales?: number;

    totalDeductedTax?: number;

    seniorDiscount?: number;

    pwdDiscount?: number;

    athleteAndCoachDiscount?: number,

    medalOfValorDiscount?: number,

    soloParentDiscount?: number,

    sn?: string;

    lockedQuantity?: number;

    lockedDate?: Date;

    refundedQuantity?: number;

    image?: string;

    status?: string;

    originalItemId?: string;

    source?: string;

    sourceValue?: string;

    itemChannel?: number;

    isHalal?: boolean;

    isTakeaway?: boolean;

    takeawayCharge?: number;

    submitId?: string;

    productInfo?: ItemProductInfoSchema;

    serviceChargeInfo?: ItemServiceChargeInfo;

    comments?: string;

    manualDiscount?: ManualDiscount;

    discountType?: string;

    discountValue?: number;

    display?: ItemDisplayFields;

    fullBillDiscount?: number;
    promotionDiscount?: number;

    // since the taxRate is editable, so for refund have to record the taxRate at the time of purchase
    taxRate?: number;

    calculation?: CalculationFieldsSchema

    isServiceChargeNotApplicable?: boolean;
}
