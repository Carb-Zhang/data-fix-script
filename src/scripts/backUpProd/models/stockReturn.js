/**
 * Created by zhengjunlin on 10/29/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ComponentUsageSchema = require('./componentUsage.js');
const Mixed = Schema.Types.Mixed;
const UserActionLogBaseSchema = require('./userActionLogBase');
const UserActionLogSchema = UserActionLogBaseSchema();

const StockReturnItem = new Schema({
    productId: {
        type: String,
        required: true,
    },
    returnedQuantity: {
        type: Number,
    },
    supplierPrice: {
        type: Number,
    },
    subTotal: {
        type: Number,
    },
    componentsUsages: {
        type: [ComponentUsageSchema],
    },
    isSerialized: Boolean,
    serialNumbers: [String],
});

const StockReturnSchema = new Schema(
    {
        business: {
            type: String,
            require: true,
        },
        stockReturnId: {
            type: Number,
            required: true,
        },
        createdTime: {
            type: Date,
            required: true,
        },
        modifiedTime: {
            type: Date,
            required: true,
        },
        name: {
            type: String,
        },
        supplierId: {
            type: String,
            required: true,
        },
        sourceStoreId: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            default: 0,
        },
        subTotal: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        tax: {
            type: Number,
            default: 0,
        },
        notes: {
            type: String,
        },
        /*
          Possible values are:
          open,
          completed,
          cancelled
        */
        status: {
            type: String,
        },
        returnedItems: {
            type: [StockReturnItem],
        },
        failedToUpdateInventory: {
            type: Boolean,
        },
        completedBy: {
            type: String,
        },
        inventoryChangeMsgTrackInfo: {
            isSendMsg: Boolean,
            sendMsgStartAt: Date,
            eventId: String,
        },
        userActionLogs: {
            type: [UserActionLogSchema],
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

StockReturnSchema.index({ business: 1, stockReturnId: 1 }, { unique: true });
StockReturnSchema.index({ business: 1, sourceStoreId: 1, createdTime: -1 });
StockReturnSchema.index({ business: 1, supplierId: 1 });
StockReturnSchema.index({ 'inventoryChangeMsgTrackInfo.sendMsgStartAt': 1 });

module.exports = mongoose.model('StockReturn', StockReturnSchema);
