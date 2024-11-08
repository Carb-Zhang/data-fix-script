/**
 * Created with JetBrains WebStorm.
 * User: z
 * Date: 13-9-21
 * Time: AM9:14
 * To change this template use File | Settings | File Templates.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelByName = require('./modelByName');

const CustomerSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        birthday: {
            type: Date,
        },
        memberId: {
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
        postalCode: {
            type: String,
        },
        signUpByEmployee: {
            type: String,
        },
        signUpFromStore: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
        },
        tags: {
            type: [String],
        },
        lastPurchaseDate: {
            type: Date,
        },
        totalSpent: {
            type: Number,
        },
        totalTransactions: {
            type: Number,
        },
        purchasedInStores: {
            type: [String],
        },
        taxIdNo: {
            type: String,
        },
        storeCreditsBalance: {
            type: Number,
        },
        storeCreditsSpent: {
            type: Number,
        },
        // _id of the consumer collection
        consumerId: {
            type: String,
        },
        // _id of the consumer collection, it is for fixing duplicate customer issue
        // if something wrong, we can use this field to revert data.
        originalConsumerId: {
            type: String,
        },
        cashbackClaimCnt: {
            type: Number,
        },
        lastCashbackClaimDate: {
            type: Date,
        },
        facebook: {
            type: String,
        },
        cashbackExpirationDate: {
            type: Date,
        },
        firstPurchaseInfo: {
            date: {
                type: Date,
            },
            storeId: {
                type: String,
            },
            registerId: {
                type: String,
            },
            employeeId: {
                type: String,
            },
            transactionId: {
                type: String,
            },
            // a sentinel field for effective utilizing index
            flag: {
                type: Boolean,
            },
        },
        /**
         * POSQR, POSCashbackReceipt, BeepQR, BeepDelivery, WebStore,
         */
        source: {
            type: String,
        },
        tmpCashbackExpirationDate: {
            type: Date,
        },
        membershipTierId: {
            // _id of the membershipTier collection
            type: String,
        },
        membershipSource: {
            type: String,
        },
        membershipTierTotalSpent: {
            type: Number,
        },
        membershipTierTotalSpentUpdatedTime: {
            type: Date,
        },
        membershipJoinTime: {
            type: Date,
        },
        membershipTierStartTime: {
            type: Date,
        },
        membershipTierNextReviewTime: {
            type: Date,
        },
        membershipTierLastChangeTime: {
            type: Date,
        },
        sourceRefId: {
            type: String,
        },
        createdAtStoreId: {
            type: String,
        },
        membershipCreatedAtStoreId: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV === 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

CustomerSchema.index({ business: 1, customerId: 1 }, { unique: true });
CustomerSchema.index({ business: 1, firstName: 1 });
CustomerSchema.index({ business: 1, lastName: 1 });
CustomerSchema.index({ business: 1, email: 1 });
CustomerSchema.index({ business: 1, phone: 1 });
CustomerSchema.index({ business: 1, memberId: 1 });
CustomerSchema.index({ business: 1, lastPurchaseDate: 1 });
CustomerSchema.index({ business: 1, totalSpent: 1 });
CustomerSchema.index({ business: 1, totalTransactions: 1 });
CustomerSchema.index({ business: 1, storeCreditsBalance: 1 });
CustomerSchema.index({ business: 1, customerId: 1, 'firstPurchaseInfo.flag': 1 }, { sparse: true });
CustomerSchema.index({ business: 1, 'firstPurchaseInfo.date': 1 }, { sparse: true });
CustomerSchema.index(
    { business: 1, membershipTierNextReviewTime: 1, isDeleted: 1 },
    {
        partialFilterExpression: {
            membershipTierNextReviewTime: { $exists: true },
        },
    },
);
CustomerSchema.index(
    { business: 1, consumerId: 1 },
    { unique: true, partialFilterExpression: { consumerId: { $exists: true } } },
);
CustomerSchema.index(
    { business: 1, customerId: 1, cashbackExpirationDate: 1 },
    {
        partialFilterExpression: {
            customerId: { $exists: true },
        },
    },
);
CustomerSchema.index({
    business: 1,
    isDeleted: 1,
    cashbackExpirationDate: 1,
    storeCreditsBalance: 1,
});
CustomerSchema.index({ cashbackExpirationDate: 1, storeCreditsBalance: 1 });
module.exports = modelByName.getModel('Customer', CustomerSchema);
