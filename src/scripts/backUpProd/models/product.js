/**
 * Created with JetBrains WebStorm.
 * User: mac
 * Date: 13-3-25
 * Time: 下午4:42
 * To change this template use File | Settings | File Templates.
 */

// Product is one collection per business

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Mixed = Schema.Types.Mixed;
const modelByName = require('./modelByName');

const SoldOutSchema = new Schema({
    storeId: {
        type: String,
        require: true,
    },
    // -1, mean would be out of stock util the merchant toggle back the item.
    // 0, mean in stock
    // unix timestamp, mean would be out of util the duration time
    duration: {
        type: Number,
        require: true,
    },
});

const ConditionalPriceDiff = new Schema({
    conditionName: {
        type: String,
    },
    platform: {
        type: Number,
    },
    priceDiff: {
        type: Number,
        require: true,
        default: 0,
    },
    isEnabled:{
        type: Boolean,
    }

})

const BeerDocketSettingsSchema = new Schema({
    isEnable: {
        type: Boolean,
    },
    docketCount: {
        type: Number,
    },
    // -1: No Expiry; 0: Same as Printed Date; 
    expirationDateDuration: {
        type: Number, 
    }
})

const OptionValueSchema = new Schema({
    value: {
        type: String,
        require: true,
    },
    order: {
        type: Number,
        require: true,
    },
    isDefault: {
        type: Boolean,
        require: true,
    },
    conditionalPriceDiffs: {
        type: [ConditionalPriceDiff],
    },
    priceDiff: {
        type: Number,
        require: true,
        default: 0,
    },
    priceDiffBeforeGstAdjustment: {
        type: Number,
    },
    markedSoldOut: {
        type: Boolean,
        default: false,
    },

    // deprecated
    soldOutStoreIds: {
        type: [String],
        default: [],
    },

    soldOutStores: {
        type: [SoldOutSchema],
        default: [],
    },
});

const VariationSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    //possible values of variationType:
    //  1. SingleChoice
    //  2. MultipleChoice
    variationType: {
        type: String,
        required: true,
    },
    optionValues: {
        type: [OptionValueSchema],
        require: true,
    },
    order: {
        type: Number,
        require: true,
    },
    allowMultiQty: {
        type: Boolean,
    },
    enableSelectionAmountLimit: {
        type: Boolean,
    },
    minSelectionAmount: {
        type: Number,
    },
    maxSelectionAmount: {
        type: Number,
    },
    sharedModifierId: {
        type: String,
    },
    isModifier: {
        type: Boolean
    }
});

const VariationValueSchema = new Schema({
    variationId: {
        type: ObjectId,
        required: true,
    },
    value: {
        type: String,
        require: true,
    },
});

const QuickSelectPositionsSchema = new Schema({
    layoutId: {
        type: ObjectId,
    },
    categoryId: {
        type: String,
    },
    row: {
        type: Number,
    },
    column: {
        type: Number,
    },
    backgroundColor: {
        type: String,
    },
});

const Component = new Schema({
    productId: {
        type: String,
        required: true,
    },

    //{
    //  key:  "{{variationId}}_{{optionId}}"
    //  value: used quantity
    //}
    usages: {
        type: Mixed,
    },
});

const PriceBookItemSchema = new Schema({
    priceBookId: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
    },
    taxCode: {
        type: String,
    },
    min: {
        type: Number,
    },
    max: {
        type: Number,
    },
});

const StockTakeItemSchema = new Schema({
    stockTakeId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
    },
    countedQty: {
        type: Number,
    },
    countedAt: Date,
    failedToUpdateInventory: {
        type: Boolean,
    },
});

const ProductSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        originalId: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        onlineTitle: {
            type: String,
        },
        detailedInfo: {
            type: String,
        },

        //Possible values:
        // 1) fixed
        // 2) variable
        // 3) weight  (weight is by unit, it's named as weight due to historical reason and for backward compatibility)
        priceType: {
            type: String,
        },
        unitPrice: {
            type: Number,
        },
        minRefUnitPrice: Number,
        maxRefUnitPrice: Number,
        onlineUnitPrice: {
            type: Number,
        },
        // price for the product that on sale
        onlineSalePrice: {
            type: Number,
        },
        grabfoodPrice: {
            type: Number,
        },
        shopeefoodPrice: {
            type: Number,
        },
        foodpandaPrice:{
            type: Number,
        },
        unit: {
            type: String,
        },
        cost: {
            type: Number,
        },
        category: {
            type: String,
        },
        tags: {
            type: [String],
        },
        createdTime: {
            type: Date,
            required: true,
        },
        modifiedTime: {
            type: Date,
            required: true,
        },
        trackInventory: {
            type: Boolean,
            require: true,
            default: false,
        },
        //possible values of variationType:
        // 1. "" (means Simple)
        // 2. Composite
        inventoryType: {
            type: String,
        },
        skuNumber: {
            type: String,
        },
        barcode: {
            type: String,
        },
        deletedSkuNumber: {
            type: String,
        },
        deletedBarcode: {
            type: String,
        },
        components: {
            type: [Component],
        },

        //Possible product types:
        // 1) Simple
        // 2) Configurable
        productType: {
            type: String,
            required: true,
            default: 'Simple',
        },

        //Variations should only exist in parent product, which specifies the possible variations of the product
        variations: {
            type: [VariationSchema],
        },

        //VariationValues should only exist in child product, which specifies the actual variation value of this child product
        variationValues: {
            type: [VariationValueSchema],
        },

        parentProductId: {
            type: ObjectId,
        },

        quickSelectPositions: {
            type: [QuickSelectPositionsSchema],
        },

        externalId: {
            type: String,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },

        loyalty: {
            type: Number,
        },

        // supplierId is here due to historical reason that it used to only support one supplier per product.
        // Once it's changed to support multiple suppliers, supplier information is only stored in supplierIds.
        // As long as the product is added or edited after multiple suppliers is supported,
        // the information is stored in supplierIds property. Otherwise the information may still be stored with supplierId.
        supplierId: {
            type: String,
        },

        supplierIds: {
            type: [String],
        },

        lastSupplierPrice: {
            type: Number,
        },

        kitchenPrinter: {
            type: String,
        },

        //ObjectId string of selected tax code. Empty means follow default tax code
        taxCode: {
            type: String,
        },

        slug: {
            type: String,
        },

        //This property is added due to multiple-choice variants.
        //Since with multiple-choice variants, it's possible a product is configurable and tracking inventory but not parent product
        isChild: {
            type: Boolean,
        },

        priceBooks: {
            type: [PriceBookItemSchema],
        },

        inventoryStartDate: {
            type: Date,
        },

        lastUpdateThumbnail: {
            type: Date,
        },
        hasThumbnail: {
            type: Boolean,
            default: false,
        },
        // elements in this array may or may not have _id on it. If the items are migrated from historical stock takes due to
        // change of re-design inventory data storage, then they don't have _id field
        stockTakes: {
            type: [StockTakeItemSchema],
        },
        isSerialized: {
            type: Boolean,
            default: false,
        },
        isSample: {
            type: Boolean,
            default: false,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        isOnBeep: {
            type: Boolean,
            default: false,
        },
        isOnGrabfood: {
            type: Boolean,
            default: false,
        },
        isOnShopeefood: {
            type: Boolean,
            default: false,
        },
        isOnFoodpanda:{
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
        },
        descriptionImages: {
            type: [String],
        },
        images: {
            type: [String],
        },
        beforeGstAdjustment: {
            type: Mixed,
        },
        markedSoldOut: {
            type: Boolean,
            default: false,
        },

        // deprecated
        soldOutStoreIds: {
            type: [String],
            default: [],
        },

        soldOutStores: {
            type: [SoldOutSchema],
            default: [],
        },

        // valid date range start date
        validFrom: {
            type: Date,
        },
        // valid date range end date
        validTo: {
            type: Date,
        },
        // From 1 to 7 to represent 7 weekdays, 1 is Sunday and 7 is Saturday, empty array means valid on all days
        validDays: {
            type: [Number],
        },
        // 0 to 23, empty means valid for all day
        validTimeFrom: {
            type: Number,
        },
        // 1 to 24, empty means till end of the day
        validTimeTo: {
            type: Number,
        },
        isBasicNecessitiesPH: {
            type: Boolean,
            default: false,
        },
        onlyForPreOrder: {
            type: Boolean,
            default: false,
        },
        isHalal: {
            type: Boolean,
        },
        beerDocketSettings: {
            type: BeerDocketSettingsSchema
        },
        isSoloParentDiscountApplicable: {
            type: Boolean
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

ProductSchema.index({ business: 1, title: 1 });
ProductSchema.index(
    { business: 1, slug: 1 },
    { unique: true, partialFilterExpression: { slug: { $exists: true } } },
);
ProductSchema.index(
    { business: 1, externalId: 1 },
    { unique: true, partialFilterExpression: { externalId: { $exists: true } } },
);
ProductSchema.index(
    { business: 1, skuNumber: 1 },
    { unique: true, partialFilterExpression: { skuNumber: { $exists: true } } },
);
ProductSchema.index(
    { business: 1, barcode: 1 },
    { unique: true, partialFilterExpression: { barcode: { $exists: true } } },
);
ProductSchema.index(
    { business: 1, supplierId: 1 },
    { partialFilterExpression: { supplierId: { $exists: true } } },
);
ProductSchema.index(
    { 'quickSelectPositions.layoutId': 1, 'quickSelectPositions.categoryId': 1 },
    { sparse: true },
);
ProductSchema.index({ 'stockTakes.stockTakeId': 1 }, { sparse: true });
ProductSchema.index({ originalId: 1 }, { sparse: true });
ProductSchema.index('parentProductId', { sparse: true });

ProductSchema.index({ business: 1, supplierIds: 1, supplierId: 1 }, { sparse: true });
ProductSchema.index({ business: 1, modifiedTime: 1, _id: 1 });
ProductSchema.index({ business: 1, isDeleted: 1, title: 1, skuNumber: 1, barcode: 1 });
ProductSchema.index({ business: 1, parentProductId: 1 });

module.exports = modelByName.getModel('Product', ProductSchema);
module.exports.VariationSchema = VariationSchema;
