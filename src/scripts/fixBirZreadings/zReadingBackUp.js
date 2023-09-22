/**
 * Created by LF on 18/07/2017.
 */

import mongoose from 'mongoose';
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
    },
    {
        autoIndex: process.env.NODE_ENV === 'development',
    },
);

export const BackUpModel = mongoose.model('zReadingBackUp', zReadingSchema);
