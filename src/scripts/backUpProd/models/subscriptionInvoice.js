const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineItemSchema = new Schema(
    { 
        unitAmount: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        taxAmount: {
            type: Number,
        },
        description: {
            type: String,
        },
        entityType: {
            type: String,
        },
        entityId: {
            type: String,
        },
        discountAmount: {
            type: Number,
        },
        itemLevelDiscountAmount: {
            type: Number,
        },
        dateFrom: {
            type: Number,
        },
        dateTo: {
            type: Number,
        }
    }
) 

const SubscriptionInvoiceSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        subscriptionId: {
            type: String,
            required: true,
        },
        invoiceId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
        },
        amountPaid: {
            type: Number,
        },
        creditsApplied: {
            type: Number,
        },
        amountDue: {
            type: Number,
        },
        currencyCode: {
            type: String,
        },
        generatedAt: {
            type: Number,
        },
        tax: {
            type: Number,
        },
        subTotal: {
            type: Number,
        },
        lineItems: [LineItemSchema],
        deleted: {
            type: Boolean
        },
        recurring: {
            type: Boolean
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    },
);

SubscriptionInvoiceSchema.index({ subscriptionId: 1, invoiceId: 1 }, {unique: true});
SubscriptionInvoiceSchema.index({ invoiceId: 1 });

module.exports = mongoose.model('SubscriptionInvoice', SubscriptionInvoiceSchema);
