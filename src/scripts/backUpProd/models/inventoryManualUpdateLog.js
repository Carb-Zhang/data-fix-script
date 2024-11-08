/**
 * Created by zhengjunlin on 4/13/15.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventoryManualUpdateLogSchema = new Schema(
    {
        logId: {
            type: String,
            required: true,
        },
        businessName: {
            type: String,
            required: true,
        },
        storeId: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
        eventTime: {
            type: Date,
            required: true,
        },
        quantityBefore: {
            type: Number,
            required: true,
        },
        quantityDiff: {
            type: Number,
            required: true,
        },
        quantityAfter: {
            type: Number,
            required: true,
        },
        employeeId: {
            type: String,
            required: true,
        },
        /*
          Possible types are:
          import,
          manualUpdate
        */
        eventType: {
            type: String,
            required: true,
        },
        pendingApply: {
            type: Boolean,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

InventoryManualUpdateLogSchema.index({ businessName: 1, storeId: 1, productId: 1, eventTime: -1 });
InventoryManualUpdateLogSchema.index({ logId: 1 });

module.exports = mongoose.model('InventoryManualUpdateLog', InventoryManualUpdateLogSchema);
