export interface CalculationDiscountFieldsSchema {
    type: string;
    subType?: string;
    discount: number;
    deductedTax: number;
    promotionId?: string;
}

export interface CalculationOriginalFieldsSchema {
    tax: number;
    subtotal: number;
    total?: number;
}

export interface CalculationFieldsSchema {
    fullPrice?: number;
    discounts?: CalculationDiscountFieldsSchema[];
    original?: CalculationOriginalFieldsSchema;
}
