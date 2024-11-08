/**
 * Created by zhengjunlin on 4/20/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComponentUsageSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    lockedQuantity: {
      type: Number,
    },
    lockedDate: {
      type: Date,
    },
});

module.exports = ComponentUsageSchema;
