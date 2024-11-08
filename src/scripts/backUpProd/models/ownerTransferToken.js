/**
 * Created with JetBrains WebStorm.
 * User: LF
 * Date: 16-01-12
 * Time: PM2:37
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerTransferTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    newOwnerId: {
        type: String,
        required: true,
    },
    //Possible values are
    // 1. requested
    // 2. confirmed (confirmed means old owner has confirmed ownership transfer request through 2-factor confirmation, e.g. email)
    // 3. completed
    status: {
        type: String,
        required: true,
    },
});

module.exports = ownerTransferTokenSchema;
