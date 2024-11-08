/**
 * Created by Congyu Li on 10/29/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppliedPromotionSchema = new Schema({
    promotionId: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    seniorDiscount: {
        type: Number,
    },
    pwdDiscount: {
        type: Number,
    },
    taxCode: {
        type: String,
    },
    taxableAmount: {
        type: Number,
    },
    taxExemptAmount: {
        type: Number,
    },
    promotionCode: {
        type: String,
    },
    promotionName: {
        type: String,
    },
    discountType: {
        type: String,
    },
    shippingFeeDiscount: {
        type: Number,
    },
    /**
     * universal or merchant/undefined/null
     */
    promotionType: {
        type: String,
    },
    storehubPaidPercentage: {
        type: Number,
        default: 0,
    },
    originalDiscountType: {
        type: String,
    },
    uniquePromotionCodeId: {
        type: String,
    },
    uniquePromotionCode: {
        type: String,
    }
});

module.exports = AppliedPromotionSchema;
