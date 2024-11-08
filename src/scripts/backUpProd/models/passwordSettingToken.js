/**
 * Created with JetBrains WebStorm.
 * User: z
 * Date: 13-7-10
 * Time: PM2:02
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordSettingTokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        isRedeemed: {
            type: Boolean,
            default: false,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

module.exports = PasswordSettingTokenSchema;
