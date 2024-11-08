const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewUpdateErrorLogSchema = new Schema(
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

        reason: {
            type: String,
            required: true,
        },

        placeId: {
          type: String,
        },

        originalError: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

ReviewUpdateErrorLogSchema.path('createdTime').index({ expires: 60 * 60 * 24 * 30 });
module.exports = mongoose.model('ReviewUpdateErrorLog', ReviewUpdateErrorLogSchema);
