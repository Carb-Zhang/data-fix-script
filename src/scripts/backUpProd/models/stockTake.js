/**
 * Created by z on 8/28/14.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const UserActionLogBaseSchema = require('./userActionLogBase');
const UserActionLogSchema = UserActionLogBaseSchema();

const StockTakeSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        startTime: {
            type: Date,
            required: true,
        },
        completeTime: {
            type: Date,
        },
        storeId: {
            type: String,
            required: true,
        },
        //if supplierId doesn't exist or is empty string, it means All Suppliers
        supplierId: {
            type: String,
        },
        //open, completed, cancelled
        status: {
            type: String,
        },
        startedBy: {
            type: String,
        },
        completedBy: {
            type: String,
        },
        // properties below will be saved after this stock take is completed
        totalQtyDiff: {
            type: Number,
        },
        totalCostDiff: {
            type: Number,
        },
        // if the status of a stock take is completed or cancelled, it should be cleaned up from Products collection
        // this value will be set to true after the scheduled clean job
        isMovedToStockTakeItems: {
            type: Boolean,
        },
        source: String,
        isCountedOnSHManager: Boolean,
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

StockTakeSchema.index({ business: 1, storeId: 1, startTime: -1 });
StockTakeSchema.index({ 'inventoryChangeMsgTrackInfo.sendMsgStartAt': 1 });

module.exports = mongoose.model('StockTake', StockTakeSchema);
