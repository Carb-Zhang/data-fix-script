const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
 
const HourlySaleSchema = new Schema(
    {
        name: {
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
 
HourlySaleSchema.index({ business: 1, date: 1, storeId: 1 }, { unique: true});
HourlySaleSchema.index({ modifiedTime: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 62 });

module.exports = mongoose.model('HourlySale', HourlySaleSchema);
 