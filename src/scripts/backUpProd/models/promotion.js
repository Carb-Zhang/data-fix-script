/**
 * Created by zhengjunlin on 9/21/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionCondition = new Schema({
    // transaction/product/customer/business
    entity: {
        type: String,
    },
    /**
     * when "entity" is "transaction", propertyName will be "total";
     * when "entity" is "customer", propertyName will be "tags";
     * when "entity" is "product", possible propertyNames will be one of "category", "tags" and "id"
     * when "entity" is "shippingZone", propertyName will be "id"
     * when "entity" is "business", propertyName will be property of business instance
     */
    propertyName: {
        type: String,
    },
    /*
      gt / in
    */
    operator: {
        type: String,
    },
    operand: {
        type: [String],
    },
    minQuantity: {
        type: Number,
    },
    maxQuantity: {
        type: Number,
    },
});

const PromotionRewardsSettings = new Schema({
    rewardsType: {
        type: String,
        required: true,
    },
    costOfPoints: {
        type: Number,
    },
    validNumber:{
        type: Number,
        required: true,
    },
    validUnit:{
        type: String, // days, months, years
        required: true,
    },
});

const PromotionSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        ordering: {
            type: Number,
            required: true,
        },
        validFrom: {
            type: Date,
        },
        validTo: {
            type: Date,
        },
        // From 1 to 7 to represent 7 weekdays, 1 is Monday and 7 is Sunday, empty array means valid on all days
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
        appliedStores: {
            type: [String],
        },
        isEnabled: {
            type: Boolean,
        },
        isDeleted: {
            type: Boolean,
        },
        // percentage/absolute/fixedUnitPrice/combo/buyXFreeY/freeShipping
        discountType: {
            type: String,
            required: true,
        },
        /*
          If discountType is percentage, this is the percentage off.
          If discountType is absolute, this is the discounted absolute value
          If discountType is fixedUnitPrice, this is the specified unit price
          If discountType is combo, this is the package price
          If discountType is buyXFreeY, this is Y
          If discountType is freeShipping, this field is 0, and zones are stored in shippingZone
        */
        discountValue: {
            type: Number,
            required: true,
        },
        conditions: {
            type: [PromotionCondition],
        },
        // If discountType is fixedUnitPrice or combo, taxCode may be specified.
        taxCode: {
            type: String,
        },
        /*
            If discountType is percentage, absolute or fixedUnitPrice, minQuantity and maxQuantity below will be set
            instead of the ones in PromotionCondition
        */
        minQuantity: {
            type: Number,
        },
        maxQuantity: {
            type: Number,
        },
        requiredProducts: {
            type: [PromotionCondition],
        },
        promotionCode: {
            type: String,
        },
        applyToOnlineStore: {
            type: Boolean,
        },
        /**
         * same promotion can apply to multiple source, so it's an array
         * POS: 1,
         * ECOMMERCE: 2,
         * BEEP_QR: 3,
         * BEEP_DELIVERY: 4,
         */
        appliedSources: {
            type: [Number],
        },
        enableClaimLimit: {
            type: Boolean,
        },
        maxClaimCount: {
            type: Number,
        },
        claimedCount: {
            type: Number,
        },
        enablePerCustomerClaimLimit: {
            type: Boolean,
        },
        perCustomerClaimLimit: {
            type: Number,
        },
        costPerSMS: {
            type: Number,
        },
        totalSMSSent: {
            type: Number,
        },
        // it means how much should storehub paid
        storehubPaidPercentage: {
            type: Number,
            default: 0,
        },
        maxDiscountAmount: {
            type: Number,
        },
        createdBy: {
            type: String,
        },
        modifiedBy: {
            type: String,
        },
        type: {
            type: String,
            default: 'merchant',
            enum: ['merchant', 'universal'],
        },
        appliedClientTypes: {
            type: [String],
        },
        enableBeepTagAndBanner: {
            type: Boolean,
        },
        isEligibleToShowOnBeep: {
            type: Boolean,
        },
        enablePerBusinessClaimLimit: {
            type: Boolean,
        },
        perBusinessClaimLimit: {
            type: Number,
        },
        // base on appliedClientTypes, appliedSources
        requireFirstPurchase: {
            type: Boolean,
        },
        isBindCampaign: {
            type: Boolean,
        },
        enabledUniquePromotionCode: {
            type: Boolean,
        },
        rewardsSettings: {
            type: [PromotionRewardsSettings],
        },
        isRepeatable: {
            type: Boolean,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

PromotionSchema.index({ business: 1, ordering: 1 });
PromotionSchema.index({ enableBeepTagAndBanner: 1 });

module.exports = mongoose.model('Promotion', PromotionSchema);
