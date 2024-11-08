/**
 * Created by CongyuLi on 24/04/17.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelByName = require('./modelByName')

const SerialNumberLog = new Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    //Possible values of eventType:
    //sale: has been sold
    //sale_cancelled: has been sold and then the trasaction is cancelled
    //return_add: has returned and been marked as adding back to the inventory
    //return_write_off: has returned and been marked as written off
    //po: purchase order
    //sr: stock return
    //st_out: has been transferred out to other store by stock transfer
    //st_in: has been transferred in from other store by stock transfer
    //product_edit_import: import directly on editing product page
    //product_edit_add: added directly on editing product page
    //import: import directly from csv
    eventType: {
        type: String,
        required: true,
    },
    storeId: {
        type: String,
        required: true,
    },
    //shows who did this if event type is import
    employeeId: {
        type: String,
    },
    //docRefId may reference to different documents depends on event type, please see the mapping below:
    //eventType: docRefId
    //sale: sale transaction Id_itemIndex
    //sale_cancelled: transaction Id_indexIndex_cancel
    //return_add: transaction Id_itemId
    //return_write_off: transaction Id_itemId
    //po: purchase order Id_itemId
    //sr: stock return Id_itemId
    //st_out: stock transfer Id_itemId
    //st_in: stock transfer Id_itemId
    //product_edit_*: <null>
    //import: <null>
    docRefId: {
        type: String,
    },
});

//a record without storeId means the serial number means the serial number once belonged to some store but
//not belong to any store anymore, it could be has been sold or returned to supplier or write-off or in the middle
//of stock transfer etc
const SerialNumberSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
        storeId: {
            type: String,
            required: true,
        },
        serialNum: {
            type: String,
            required: true,
        },
        logs: [SerialNumberLog],
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

SerialNumberSchema.index({ business:1, serialNum: 1 });
SerialNumberSchema.index({ productId: 1, storeId: 1 });
SerialNumberSchema.index({ productId: 1, serialNum: 1 }, { unique: 1 });

module.exports = modelByName.getModel('SerialNumber', SerialNumberSchema)
