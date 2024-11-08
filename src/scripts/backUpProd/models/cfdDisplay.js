/**
 * Created by LF on 03/10/2017.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cfdDisplaySchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        assignedStores: {
            type: [String],
        },

        assignedAllStores: {
            type: Boolean,
        },

        enabled: {
            type: Boolean,
        },

        ordering: {
            type: Number,
        },

        type: {
            type: String,
            required: true,
        },

        text: {
            type: String,
        },

        images: {
            type: [String],
        },
    },
    {
        autoIndex: process.env.NODE_ENV === 'development',
    },
);

cfdDisplaySchema.index(
    {
        business: 1,
    },
    {
        unique: false,
    },
);

module.exports = mongoose.model('cfdDisplay', cfdDisplaySchema);
