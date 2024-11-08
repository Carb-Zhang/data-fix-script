/**
 * Created with JetBrains WebStorm.
 * User: mac
 * Date: 13-3-25
 * Time: 下午12:10
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const PurchasedItemOptionSchema = require('./purchasedItemOption.js');
const ComponentUsageSchema = require('./componentUsage.js');
const AppliedPromotionSchema = require('./appliedPromotion.js');
const CalculationFieldsSchema = require('./calculationFields.js');

const ItemProductInfoSchema = new Schema({
    title: {
        type: String,
    },
    productId: {
        type: String,
    },
    unitPrice: {
        type: Number,
    },
    displayPrice: {
        type: Number,
    },
    originalDisplayPrice: {
        type: Number,
    },
    productParentId: {
        type: String,
    },
    taxCode: {
        type: String,
    },
    taxRate: {
        type: Number,
    },
    image: {
        type: String,
    },
    originImage: {
        type: String,
    },
    trackInventory: {
        type: Boolean,
    },
    inventoryType: {
        type: String,
    },
    isHalal: {
        type: Boolean,
    },
    category: {
        type: String,
    },
    tags: {
        type: [String],
    },
    isVatExempted: {
        type: Boolean,
        default: false,
    }
});

const ItemServiceChargeInfo = new Schema({
    taxCode: String,
    taxRate: Number,
    rate: Number,
});

const ItemManualDiscount = new Schema({
    // amount/percentage
    type: {
        type: String,
        require: true,
    },
    value: {
        type: Number,
        require: true,
    },
});

const ItemDisplayFields = new Schema({
    total: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    subtotal: {
        type: Number,
    },
    discount: {
        type: Number,
    },
});

const ItemSchema = new Schema({
    //Possible values are : Discount/ServiceCharge
    itemType: {
        type: String,
    },
    title: {
        type: String,
    },
    productId: {
        type: ObjectId,
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    // total = subTotal - discount
    total: {
        type: Number,
        required: true,
    },

    //discount = adhocDiscount + discount in all promotions + senior/pwd discounts
    discount: {
        type: Number,
        default: 0,
    },

    //adhocDiscount is manual discount
    adhocDiscount: {
        type: Number,
    },

    loyaltyDiscount: {
        type: Number,
    },

    promotions: {
        type: [AppliedPromotionSchema],
    },

    // Quantity of component used by per unit
    componentsUsages: {
        type: [ComponentUsageSchema],
    },
    selectedOptions: {
        type: [PurchasedItemOptionSchema],
    },
    // tax = (subTotal - discount) * taxRate
    tax: Number,
    orderingValue: Number,
    unitPrice: Number,
    cost: Number,
    notes: String,
    //ObjectId string of the tax code
    taxCode: String,
    taxableAmount: Number,
    taxExemptAmount: Number,
    zeroRatedSales: Number,
    totalDeductedTax: Number,
    // In Philippines, seniors and PWDs(person with disability) can be offered with certain percentage of discount
    // proportionally in every order they make
    seniorDiscount: Number,
    pwdDiscount: Number,
    athleteAndCoachDiscount: Number,
    medalOfValorDiscount: Number,
    soloParentDiscount: Number,
    sn: String,

    /* Item Inventory status for online orders */
    /* lockedQuantity:
      -1: not tracking inventory
      0 : no inventory been locked
      number: locked inventory quantity
    */

    lockedQuantity: {
        type: Number,
    },
    lockedDate: {
        type: Date,
    },
    refundedQuantity: {
        type: Number,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
    },
    originalItemId: {
        type: String,
    },
    /*
    source:
      wishlist, collection, search, home, direct
    */
    source: {
        type: String,
    },
    sourceValue: {
        type: String,
    },

    itemChannel: {
        type: Number,
    },

    isHalal: {
        type: Boolean,
    },
    isTakeaway: {
        type: Boolean,
    },
    takeawayCharge: {
        type: Number,
    },
    submitId: {
        type: String,
    },
    productInfo: {
        type: ItemProductInfoSchema,
    },

    serviceChargeInfo: {
        type: ItemServiceChargeInfo,
    },

    comments: {
        type: String,
    },

    manualDiscount: {
        type: ItemManualDiscount,
    },
    // when itemType is Discount, the following two fields to record input info for the Discount
    discountValue: {
        type: Number,
    },
    discountType: {
        type: String,
    },
    display: {
        type: ItemDisplayFields,
    },
    fullBillDiscount: {
        type: Number,
    },
    // when applied amount off promotion, it will have
    promotionDiscount: {
        type: Number,
    },
    taxRate: {
        type: Number,
    },
    calculation: {
        type: CalculationFieldsSchema,
    },
    isServiceChargeNotApplicable: {
        type: Boolean,
    },
});

module.exports = ItemSchema;
