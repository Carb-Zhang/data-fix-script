const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankAccountSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        bankName: {
            type: String,
            required: true,
        },
        bankCode: {
            type: String,
            required: true,
        },
        bankAccountNumber: {
            type: String,
            required: true,
        },
        holderName: {
            type: String,
            required: true,
        },
        emails: {
            type: [String],
            required: true,
        },
        appliedStores: {
            type: [String]
        },
        isDeleted: {
            type: Boolean,
            defaultValue: false,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    },
);

BankAccountSchema.index({ business: 1 });
BankAccountSchema.index({ appliedStores: 1 });

module.exports = mongoose.model('BankAccount', BankAccountSchema);
