/**
 * Created with JetBrains WebStorm.
 * User: z
 * Date: 4/25/14
 * Time: 12:42 PM
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        contactName: {
            type: String,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
        },
        fax: {
            type: String,
        },
        website: {
            type: String,
        },
        street1: {
            type: String,
        },
        street2: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        postalCode: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

SupplierSchema.index({ business: 1, name: 1 });

module.exports = mongoose.model('Supplier', SupplierSchema);
