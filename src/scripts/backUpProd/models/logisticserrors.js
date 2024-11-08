const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogisticsErrorsSchema = new Schema(
    {
        partnerName: {
            type: String,
            required: true,
        },
        statusCode: {
            type: Number,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        behaviourType: {
            type: String,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

LogisticsErrorsSchema.index({ statusCode: 1, time: -1 });
LogisticsErrorsSchema.index({ time: -1 });
LogisticsErrorsSchema.path('time').index({ expires: 60 * 60 * 24 * 7 });

module.exports = mongoose.model('LogisticsErrors', LogisticsErrorsSchema);
