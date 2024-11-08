const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ConditionSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    //in
    operator: {
        type: String,
    },
    //can be tags, categories and productIds
    operand: {
        type: [String],
    },
});

const OnlineCategorySchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
        },

        isEnabled: {
            type: Boolean,
            required: true,
        },

        ordering: {
            type: Number,
        },

        //All or Any
        conditionsMatch: {
            type: String,
            required: true,
        },

        conditions: {
            type: [ConditionSchema],
        },

        isEditable: {
            type: Boolean,
        },

        // [] or not existing means not applied any sources;
        // UNKNOWN: 0,
        // POS: 1,
        // ECOMMERCE: 2,
        // BEEP_QR: 3,
        // BEEP_DELIVERY: 4,
        // GRABFOOD: 10,
        // SHOPEEFOOD: 11,
        // FOODPANDA: 12
        appliedSources: {
            type: [Number],
        },

        // ecommerce:1, beep3:, grab: 10, shopee:11, foodpanda:12  all channels: [1, 3, 10, 11, 12]
        channels: {
          type: [Number]
        },
        // visible stores
        // value: [] means all stores.
        appliedStores: {
            type: [String],
        },
        sortType:{
            type: String,
        },
        sortOrdering:{
            type: String,
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

OnlineCategorySchema.index({ business: 1, slug: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('OnlineCategory', OnlineCategorySchema);
