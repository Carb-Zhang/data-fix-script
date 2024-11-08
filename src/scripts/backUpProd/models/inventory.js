/**
 * Created by Congyu Li on 12/3/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const modelByName = require('./modelByName');

const InventorySchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        storeId: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            require: true,
        },
        quantityOnHand: {
            type: Number,
            required: true,
        },
        restockLevel: {
            type: Number,
        },
        desiredStockLevel: {
            type: Number,
        },
        isSerialized: {
            type: Boolean,
            default: false,
        },
        pendingTransactions: {
            type: [ObjectId],
        },
        pendingReturnProcess: {
            type: [ObjectId],
        },
        pendingPurchaseOrders: {
            type: [ObjectId],
        },
        pendingStockTakes: {
            type: [ObjectId],
        },
        pendingStockTransfers: {
            type: [ObjectId],
        },
        //only one pendingStockTransfers array cannot differentiate the cases of failed to finish marking a stock transfer as shipped
        // or failed to finish cancelling a shipped stock transfer.
        pendingCancelledStockTransfers: {
            type: [ObjectId],
        },
        pendingManualUpdateLogs: {
            type: [String],
        },
        pendingStockReturns: {
            type: [ObjectId],
        },
        supplyNeedsNotified: {
            type: Boolean,
        },
        appliedEventIds: [String],
        updatedAtInMs: Number,
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

InventorySchema.index({ productId: 1, storeId: 1 }, { unique: true });
InventorySchema.index({ business: 1, supplyNeedsNotified: 1 });
InventorySchema.index({ business: 1, storeId: 1 });

InventorySchema.index(
    { business: 1, storeId: 1, pendingStockReturns: 1 },
    { partialFilterExpression: { pendingStockReturns: { $exists: true } } },
);
InventorySchema.index(
    { business: 1, storeId: 1, pendingStockTakes: 1 },
    { partialFilterExpression: { pendingStockTakes: { $exists: true } } },
);
InventorySchema.index(
    { business: 1, storeId: 1, pendingPurchaseOrders: 1 },
    { partialFilterExpression: { pendingPurchaseOrders: { $exists: true } } },
);
InventorySchema.index(
    { business: 1, storeId: 1, pendingStockTransfers: 1 },
    { partialFilterExpression: { pendingStockTransfers: { $exists: true } } },
);
module.exports = modelByName.getModel('Inventory', InventorySchema);
