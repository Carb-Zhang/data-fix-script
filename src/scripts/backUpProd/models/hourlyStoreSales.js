const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const HourlyStoreSalesSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        date: {
            type: Number,
            required: true,
        },
        storeId: {
            type: mongoose.ObjectId,
            required: true,
        },
        channel: {
            type: String,
            required: true,
        },
        sales: {
            type: Number,
        },
        returns: {
            type: Number,
        },
        tax:{
            type: Number,
        },
        rounding: {
            type: Number,
        },
        cost: {
            type: Number,
        },
        transactions: {
            type: Number,
        },
        transactionItems: {
            type: Number,
        },
        serviceCharge: {
            type: Number,
        },
        totalPax: {
            type: Number,
        },
        // for creating TTL index
        modifiedTime: {
            type: Date
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);
 
HourlyStoreSalesSchema.index({ business: 1, date: 1, storeId: 1, channel: 1 }, { unique: true});
HourlyStoreSalesSchema.index({ modifiedTime: 1 }, { expireAfterSeconds: 5356800 }); // expire after 62 days

module.exports = mongoose.model('HourlyStoreSales', HourlyStoreSalesSchema);