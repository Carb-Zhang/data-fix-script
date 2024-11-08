/**
 * Created by z on 12/14/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockTakeItemSchema = new Schema({
    stockTakeId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
    },
    countedQty: {
        type: Number,
    },
});

StockTakeItemSchema.index({ stockTakeId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('StockTakeItem', StockTakeItemSchema);
