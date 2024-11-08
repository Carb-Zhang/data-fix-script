const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        unitPrice: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    },
);

const AddonSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        unitPrice: {
            type: Number,
            required: true,
        },
        count: {
            type: Number,
        },
    },
    {
        _id: false,
    },
);

const CouponSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        appliedCount: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    },
);

const SubscriptionSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        subscriptionId: {
            type: String,
            required: true,
        },
        plan: {
            type: PlanSchema,
        },
        addons: {
            type: [AddonSchema],
        },
        coupons: {
            type: [CouponSchema],
        },
        lastEventTime: {
            type: Date,
        },
        subscriptionCreatedTime: {
            type: Date,
        },
        creditCardAddedWay: {
            type: String,
        },
        hasScheduledChanges: {
            type: Boolean,
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
);

SubscriptionSchema.index({ business: 1 }, { unique: true });
SubscriptionSchema.index({ subscriptionId: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
