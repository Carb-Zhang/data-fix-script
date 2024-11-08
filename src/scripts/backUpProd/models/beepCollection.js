const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeepCollectionSchema = new Schema(
    {
        beepCollectionId: {
            type: String,
            required: true,
        },

        urlPath: {
            type: String,
            required: true,
        },

        displayType: {
            type: String,
            required: true,
            enum: ['Icon', 'Banner', 'Carrousel', 'SearchPopular', 'SearchOthers'],
        },

        image: {
            type: String,
        },

        name: {
            type: String,
            required: true,
        },

        countryCode: {
            type: String,
            required: true,
            enum: ['MY', 'SG', 'TH', 'PH'],
        },

        sortWeight: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            require: true,
            enum: ['Live', 'Draft'],
        },

        shippingType: {
            type: String,
            enum: ['Delivery', 'Pickup'],
        },

        tags: {
            type: [String],
        },

        marketingTags: {
            type: [String],
        },

        freeShipping: {
            type: Boolean,
        },

        cashbackEnabled: {
            type: Boolean,
        },

        createdBy: {
            type: String,
        },

        merchantFile: {
            type: String,
        },

        merchantList: {
            type: [String],
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

BeepCollectionSchema.index({ beepCollectionId: 1 }, { unique: true });
BeepCollectionSchema.index({ urlPath: 1, countryCode: 1 }, { unique: true });
BeepCollectionSchema.index({
    displayType: 1,
    sortWeight: 1,
});

module.exports = mongoose.model('BeepCollection', BeepCollectionSchema);
