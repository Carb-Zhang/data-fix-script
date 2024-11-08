/**
 * Created by zhengjunlin on 2/10/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ComponentUsageSchema = require('./componentUsage.js');
const Mixed = Schema.Types.Mixed;
const UserActionLogBaseSchema = require('./userActionLogBase');
const UserActionLogSchema = UserActionLogBaseSchema();

const StockTransferItem = new Schema({
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
    },
    componentsUsages: {
        type: [ComponentUsageSchema],
    },
    isSerialized: Boolean,
    serialNumbers: [String],
});

const StockTransferSchema = new Schema(
    {
        business: {
            type: String,
            require: true,
        },
        stockTransferId: {
            type: Number,
            required: true,
        },
        createdTime: {
            type: Date,
            required: true,
        },
        shippedDate: {
            type: Date,
        },
        completedAt: {
            type: Date,
        },
        modifiedTime: {
            type: Date,
            required: true,
        },
        sourceStoreId: {
            type: String,
            required: true,
        },
        targetStoreId: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        //Possible Values are :
        //created
        //shipped
        //completed
        //cancelled
        status: {
            type: String,
        },
        orderedItems: {
            type: [StockTransferItem],
        },
        failedToUpdateInventory: {
            type: Boolean,
        },
        shippedBy: {
            type: String,
        },
        receivedBy: {
            type: String,
        },
        //markShippedAt is the time the stock transfer has been marked as shipped.
        //The time can be different from specified ship date (e.g the user mark the stock transfer as shipped after 2 days the stock is shipped)
        //This time is important for audit trail, since this is when the inventory is actually deducted.
        //shippedDate cannot be used since it doesn't record specific time and will cause the issue https://storehub.atlassian.net/browse/SBO-421
        markShippedAt: {
            type: Date,
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

StockTransferSchema.index({ business: 1, stockTransferId: 1 }, { unique: true });
StockTransferSchema.index({ business: 1, supplyingStoreId: 1, createdTime: -1 });
StockTransferSchema.index({ business: 1, targetStoreId: 1 });
StockTransferSchema.index({ 'inventoryChangeMsgTrackInfo.sendMsgStartAt': 1 });

module.exports = mongoose.model('StockTransfer', StockTransferSchema);
