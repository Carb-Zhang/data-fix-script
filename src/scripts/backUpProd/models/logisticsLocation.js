const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogisticsLocationSchema = new Schema(
    {
        jobId: {
            type: String,
            required: true,
        },
        receiptNumber: {
            type: String,
            required: true,
        },
        riderId: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

module.exports = mongoose.model('LogisticsLocations', LogisticsLocationSchema);
