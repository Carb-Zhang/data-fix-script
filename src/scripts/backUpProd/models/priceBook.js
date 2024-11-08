/**
 * Created by z on 12/29/14.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceBookSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        //  validFrom: {
        //    type: Date
        //  },
        //  validTo: {
        //    type: Date
        //  },
        appliedStores: {
            type: [String],
        },
        appliedCustomerTags: {
            type: [String],
        },
        isDeleted: {
            type: Boolean,
        },
        ordering: {
            type: Number,
        },
        enableServiceCharge: {
            type: Boolean,
        },
        serviceChargeRate: {
            type: Number,
        },
        serviceChargeTax: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

PriceBookSchema.index({ business: 1, ordering: 1 });

module.exports = mongoose.model('PriceBook', PriceBookSchema);
