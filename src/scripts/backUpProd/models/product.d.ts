import { Document, Types, Model } from 'mongoose';

export interface SoldOutSchema {
    storeId: string;
    duration: number;
}

export interface ConditionalPriceDiffSchema {
    conditionName: string;
    platform: number;
    priceDiff: number;
    isEnabled: boolean;
}

export interface OptionValueSchema {
    id?: string;
    value: string;
    order: number;
    isDefault: boolean;
    conditionalPriceDiffs?: ConditionalPriceDiffSchema[];
    priceDiff: number;
    priceDiffBeforeGstAdjustment?: number;
    markedSoldOut?: boolean;
    soldOutStoreIds?: string[];
    soldOutStores?: SoldOutSchema[];
}

export interface VariationSchema {
    name: string;
    variationType: string;
    optionValues: OptionValueSchema[];
    order?: number;
    allowMultiQty?: boolean;
    enableSelectionAmountLimit?: boolean;
    minSelectionAmount?: number;
    maxSelectionAmount?: number;
    sharedModifierId?: string;
}

export interface VariationValueSchema {
    variationId: Types.ObjectId;
    value: string;
}

export interface QuickSelectPositionsSchema {
    layoutId?: Types.ObjectId;
    categoryId?: string;
    row?: number;
    column?: number;
    backgroundColor?: string;
}

export interface ComponentSchema {
    productId: string;
    usages?: any;
}

export interface PriceBookItemSchema extends Document {
    priceBookId: string;
    unitPrice?: number;
    taxCode?: string;
    min?: number;
    max?: number;
}

export interface StockTakeItemSchema {
    stockTakeId: string;
    quantity?: number;
    countedQty?: number;
    countedAt?: Date;
    failedToUpdateInventory?: boolean;
}

export interface ProductSchema extends Document {
    business: string;
    title: string;
    onlineTitle?: string;
    detailedInfo?: string;
    priceType?: string;
    unitPrice?: number;
    onlineUnitPrice?: number;
    unit?: string;
    cost?: number;
    category?: string;
    tags?: string[];
    createdTime: Date;
    modifiedTime: Date;
    trackInventory: boolean;
    inventoryType?: string;
    skuNumber?: string;
    barcode?: string;
    deletedSkuNumber?: string;
    deletedBarcode?: string;
    components?: ComponentSchema[];
    productType: string;
    variations?: VariationSchema[];
    variationValues?: VariationValueSchema[];
    parentProductId?: Types.ObjectId;
    quickSelectPositions?: QuickSelectPositionsSchema[];
    externalId?: string;
    isDeleted?: boolean;
    loyalty?: number;
    supplierId?: string;
    supplierIds?: string[];
    lastSupplierPrice?: number;
    kitchenPrinter?: string;
    taxCode?: string;
    slug?: string;
    isChild?: boolean;
    priceBooks?: PriceBookItemSchema[];
    inventoryStartDate?: Date;
    lastUpdateThumbnail?: Date;
    hasThumbnail?: boolean;
    stockTakes?: StockTakeItemSchema[];
    isSerialized?: boolean;
    isSample?: boolean;
    isOnline?: boolean;
    description?: string;
    descriptionImages?: string[];
    images?: string[];
    beforeGstAdjustment?: Object;
    markedSoldOut?: boolean;
    soldOutStoreIds?: string[];
    soldOutStores: SoldOutSchema[];
    isBasicNecessitiesPH?: boolean;
    onlineSalePrice?: number;
    grabfoodPrice?: number;
    shopeefoodPrice?: number;
    foodpandaPrice?: number;
    onlyForPreOrder?: boolean;
    isHalal?: boolean;
    isOnGrabfood?: boolean;
    isOnShopeefood?: boolean;
    isOnFoodpanda?: boolean;
    isSoloParentDiscountApplicable?: boolean;
}

declare const Product: Model<ProductSchema>;

export default Product;
