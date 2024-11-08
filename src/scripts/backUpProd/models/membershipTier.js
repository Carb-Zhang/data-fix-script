const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MembershipTierSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            required: true,
        },
        spendingThreshold: {
            type: Number,
            required: true,
        },
        pointsThreshold: {
            type: Number,
        },
        cashbackRate: {
            type: Number,
        }, // cashback exchange rate percentage, with 20 denoting 20%
        pointRate: {
            type: Number,
        }, // point exchange rate percentage, with 20 denoting 20%
        business: {
            type: String,
            required: true,
        },
    },
    {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
);

MembershipTierSchema.index({ business: 1, name: 1 }, { unique: true });
MembershipTierSchema.index({ business: 1, level: 1 }, { unique: true });
MembershipTierSchema.index({ business: 1, spendingThreshold: 1 }, { unique: true });
MembershipTierSchema.index({ level: 1 });

module.exports = mongoose.model('MembershipTier', MembershipTierSchema);
