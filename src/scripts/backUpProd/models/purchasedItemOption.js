/**
 * Created by zhengjunlin on 4/28/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchasedItemOptionSchema = new Schema({
    variationId: {
        type: String,
        required: true,
    },
    optionId: {
        type: String,
        required: true,
    },
    optionValue: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

module.exports = PurchasedItemOptionSchema;
