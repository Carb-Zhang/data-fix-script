const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        businessName: String,
        registerId: String,
        localSettings: [{
            key: String,
            value: String,
        }],
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

schema.index({ businessName: 1, registerId: 1 }, { unique: true });

module.exports = mongoose.model('RegisterLocalSetting', schema);

