export interface AppliedPromotionSchema {
    promotionId: string;

    discount: number;

    tax?: number;

    quantity?: number;

    seniorDiscount?: number;

    pwdDiscount?: number;

    taxCode?: string;

    taxableAmount?: number;

    taxExemptAmount?: number;

    promotionCode?: string;

    promotionName?: string;

    discountType?: string;

    shippingFeeDiscount?: number;

    promotionType?: string;

    storehubPaidPercentage?: number;

    originalDiscountType?: string;

    uniquePromotionCodeId?: string;

    uniquePromotionCode?: string;
}
