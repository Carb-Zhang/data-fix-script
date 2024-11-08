const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalculationDiscountFieldsSchema = new Schema({
    /**
     *  TransactionManualDiscount
     *  ItemManualDiscount
     *  Loyalty cashback or store credits
     *  BIR
     *  Promotion
     */
    type: {
        type: String,
        required: true,
    },
    // if type is BIR, subType is required
    /**
     * SC/PWD
     * ATHLETE_AND_COACH
     * MEDAL_OF_VALOR
     * DIPLOMAT
     */
    subType: {
        type: String,
    },
    discount: {
        type: Number,
        required: true,
    },
    deductedTax: {
        type: Number,
        required: true,
    },
    // if type is Promotion, promotionId is required
    promotionId: {
        type: String,
    },
});

const CalculationOriginalFieldsSchema = new Schema({
    tax: {
        type: Number,
        require: true,
    },
    subtotal: {
        type: Number,
        require: true,
    },
    // currently, only transaction level original total is stored
    total: {
        type: Number,
    },
});

const CalculationFieldsSchema = new Schema({
    // if it's item level, this field is required
    fullPrice: {
        type: Number,
    },
    discounts: [CalculationDiscountFieldsSchema],
    original: CalculationOriginalFieldsSchema,
});

module.exports = CalculationFieldsSchema;
