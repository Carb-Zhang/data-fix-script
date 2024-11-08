const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionLoyaltySchema = new Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createTime',
            updatedAt: 'updateTime',
        },
    },
);

TransactionLoyaltySchema.index(
    {
        businessName: 1,
        receiptNumber: 1,
    },
    { unique: true },
);

module.exports = mongoose.model('TransactionLoyalty', TransactionLoyaltySchema);
