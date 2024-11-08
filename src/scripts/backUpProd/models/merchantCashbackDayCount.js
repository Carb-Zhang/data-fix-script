const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchantCashbackDayCountSchema = new Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        dateStr: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

MerchantCashbackDayCountSchema.index({
    businessName: 1,
    dateStr: 1,
});

module.exports = mongoose.model('MerchantCashbackDayCount', MerchantCashbackDayCountSchema);
