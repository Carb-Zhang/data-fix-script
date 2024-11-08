const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
);

module.exports = LocationSchema;
