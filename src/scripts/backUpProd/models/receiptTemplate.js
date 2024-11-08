/**
 * Created by z on 11/28/14.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceiptTemplateSchema = new Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        logoData: {
            type: Buffer,
        },
        logoContentType: {
            type: String,
        },
        showBarcode: {
            type: Boolean,
            default: true,
        },
        showStoreName: {
            type: Boolean,
            default: true,
        },
        customerInfo: {
            type: [String],
        },
        taxName: {
            type: String,
        },
        showNotes: {
            type: Boolean,
            default: true,
        },
        modifiedTime: {
            type: Date,
        },
        isDefault: {
            type: Boolean,
        },
        //thermal, a4
        receiptType: {
            type: String,
        },
        //whether print power by storehub on receipt
        poweredBy: {
            type: Boolean,
            default: true,
        },
        disableTitle: {
            type: Boolean,
            default: false,
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

ReceiptTemplateSchema.index({ businessName: 1 });

module.exports = mongoose.model('ReceiptTemplates', ReceiptTemplateSchema);
