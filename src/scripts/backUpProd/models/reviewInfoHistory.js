const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewInfoHistorySchema = new Schema(
    {
        business: {
          type: String,
          required: true,
        },

        refType: {
            type: String,
            enum: ['store', 'product'],
            required: true,
        },

        refId: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
        },

        ratingCount: {
            type: Number,
        },

        priceLevel: {
            type: Number
        },

        placeId: {
            type: String
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

ReviewInfoHistorySchema.index({ refId: 1, refType: 1, business: 1 } );
module.exports = mongoose.model('ReviewInfoHistory', ReviewInfoHistorySchema);
