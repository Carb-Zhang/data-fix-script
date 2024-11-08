/**
 * Created with JetBrains WebStorm.
 * User: z
 * Date: 4/27/14
 * Time: 4:46 PM
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ComponentUsageSchema = require('./componentUsage.js');
const Mixed = Schema.Types.Mixed;
const UserActionLogBaseSchema = require('./userActionLogBase');
const UserActionLogSchema = UserActionLogBaseSchema();

const PurchaseOrderItem = new Schema({
    productId: {
        type: String,
        required: true,
    },
    orderedQuantity: {
        type: Number,
    },
    supplierPrice: {
        type: Number,
    },
    receivedQuantity: {
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

const PurchaseOrderSchema = new Schema(
    {
        business: {
            type: String,
            require: true,
        },
        purchaseOrderId: {
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
        expectedArrivalDate: {
            type: Date,
        },
        supplierId: {
            type: String,
            required: true,
        },
        targetStoreId: {
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
          partiallyReceived,
          completed,
          cancelled
        */
        status: {
            type: String,
        },
        orderedItems: {
            type: [PurchaseOrderItem],
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

PurchaseOrderSchema.index({ business: 1, purchaseOrderId: 1 }, { unique: true });
PurchaseOrderSchema.index({ business: 1, targetStoreId: 1, createdTime: -1 });
PurchaseOrderSchema.index({ business: 1, supplierId: 1 });
PurchaseOrderSchema.index({ 'inventoryChangeMsgTrackInfo.sendMsgStartAt': 1 });

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
