/**
 * Created by LF on 18/07/2017.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentCollection = new Schema({
    name: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
    },
    amount: {
        type: Number,
    },
});

const zReadingSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        registerId: {
            type: String,
            required: true,
        },
        storeId: {
            type: String,
            required: true,
        },
        zCount: {
            type: Number,
            required: true,
        },
        closeTime: {
            type: Date,
            required: true,
        },
        grossSales: {
            type: Number,
        },
        totalDeductedVat: {
            type: Number,
        },
        netSales: {
            type: Number,
        },
        paymentCollections: {
            type: [paymentCollection],
        },
        vatAbleSales: {
            type: Number,
        },
        vatAmount: {
            type: Number,
        },
        vatExemptSales: {
            type: Number,
        },
        zeroRatedSales: {
            type: Number,
        },
        scDiscount: {
            type: Number,
        },
        pwdDiscount: {
            type: Number,
        },
        athleteAndCoachDiscount: Number,
        medalOfValorDiscount: Number,
        soloParentDiscount: Number,
        regularDiscount: {
            type: Number,
        },
        serviceCharge: {
            type: Number,
        },
        serviceChargeTax: {
            type: Number,
        },
        startORNumber: {
            type: String,
        },
        endORNumber: {
            type: String,
        },
        startTrxNumber: {
            type: String,
        },
        endTrxNumber: {
            type: String,
        },
        salesTrxCount: {
            type: Number,
        },
        refundTrxCount: {
            type: Number,
        },
        refundAmount: {
            type: Number,
        },
        oldNet: {
            type: Number,
        },
        newNet: {
            type: Number,
        },
        oldGross: {
            type: Number,
        },
        newGross: {
            type: Number,
        },
        zStartTime: Date,
        zEndTime: Date,
        serialNo: {
            type: String,
        },
        ptu: {
            type: String,
        },
        tin: {
            type: String,
        },
        headcount: {
            type: Number,
        },
        minNo: {
            type: String,
        },
        transactionsWithScDiscount: {
            type: Number,
        },
        transactionsWithPwdDiscount: {
            type: Number,
        },
        transactionsWithRegularDiscount: {
            type: Number,
        },
        transactionsWithAthleteAndCoachDiscount: {
            type: Number,
        },
        transactionsWithMedalOfValorDiscount: {
            type: Number,
        },
        extendedInfoForMall: {
            vatableOldNet: Number,
            vatableNewNet: Number,
            vatExemptOldNet: Number,
            vatExemptNewNet: Number,
            vatableRefundAmount: Number,
            vatExemptRefundAmount: Number,
            vatableVoidAmount: Number,
            vatExemptVoidAmount: Number,
            voidAmount: Number,
            customerCount: Number,
            voidTrxCount: Number,
            discountedTrxCount: Number,
            oldVoidAmount: Number,
            newVoidAmount: Number,
            oldVoidNumber: Number,
            newVoidNumber: Number,
        },
    },
    {
        autoIndex: process.env.NODE_ENV === 'development',
    },
);

zReadingSchema.index({ business: 1, registerId: 1, zCount: -1 }, { unique: true });

module.exports = mongoose.model('zReading', zReadingSchema);
