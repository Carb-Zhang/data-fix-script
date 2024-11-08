"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StripeCustomer = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    stripeSite: {
        type: String,
        required: true,
    },
    stripeCustomerId: {
        type: String,
        required: true,
    },
}, {
    autoIndex: process.env.NODE_ENV !== 'production',
    timestamps: true,
});
StripeCustomer.index({ userId: 1, stripeSite: 1, stripeCustomerId: 1 }, { unique: true });
const StripeCustomerModel = (0, mongoose_1.model)('StripeCustomer', StripeCustomer);
exports.default = StripeCustomerModel;
