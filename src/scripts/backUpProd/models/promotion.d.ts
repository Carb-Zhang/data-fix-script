import { Document, Types, Model, LeanType, LeanDocument } from 'mongoose';

declare const Promotion: Model<PromotionSchema>;
export default Promotion;

export type PromotionLeanType = LeanType<PromotionSchema>;

export interface PromotionConditionSchema {
    entity: string;
    propertyName: string;
    operator: string;
    operand: string[];
    minQuantity?: number;
    maxQuantity?: number;
}
export interface PromotionRewardsSettingsSchema {
    rewardsType: string;
    costOfPoints?: number;
    validNumber: number;
    validUnit: string;
}

export interface PromotionSchema extends Document {
    business: string;
    name: string;
    createdTime?: Date;
    modifiedTime?: Date;
    ordering: number;
    validFrom: Date;
    validTo: Date;
    validDays: number[];
    // 0 to 23, empty means valid for all day
    validTimeFrom: number;
    // 1 to 24, empty means till end of the day
    validTimeTo: number;
    appliedStores: string[];
    isEnabled: boolean;
    isDeleted: boolean;
    // percentage/absolute/fixedUnitPrice/combo/buyXFreeY/freeShipping
    discountType: string;
    /*
          If discountType is percentage, this is the percentage off.
          If discountType is absolute, this is the discounted absolute value
          If discountType is fixedUnitPrice, this is the specified unit price
          If discountType is combo, this is the package price
          If discountType is buyXFreeY, this is Y
          If discountType is freeShipping, this field is 0, and zones are stored in shippingZone
        */
    discountValue: number;
    conditions: PromotionConditionSchema[];
    // If discountType is fixedUnitPrice or combo, taxCode may be specified.
    taxCode: string;
    /*
            If discountType is percentage, absolute or fixedUnitPrice, minQuantity and maxQuantity below will be set
            instead of the ones in PromotionCondition
        */
    minQuantity: number;
    maxQuantity: number;
    requiredProducts: PromotionConditionSchema[];
    promotionCode: string;
    applyToOnlineStore: boolean;
    appliedSources: number[];
    enableClaimLimit: boolean;
    maxClaimCount: number;
    claimedCount: number;
    enablePerCustomerClaimLimit: boolean;
    perCustomerClaimLimit: number;
    costPerSMS?: number;
    totalSMSSent?: number;
    storehubPaidPercentage?: number;
    maxDiscountAmount?: number;
    createdBy?: string;
    modifiedBy?: string;
    type: string;
    appliedClientTypes?: string[];
    enableBeepTagAndBanner?: boolean;
    isEligibleToShowOnBeep?: boolean;
    enablePerBusinessClaimLimit: boolean;
    perBusinessClaimLimit: number;
    requireFirstPurchase?: boolean;
    isBindCampaign?: boolean;
    enabledUniquePromotionCode?: boolean;
    rewardsSettings?: PromotionRewardsSettingsSchema[];
    isRepeatable?: boolean;
}
