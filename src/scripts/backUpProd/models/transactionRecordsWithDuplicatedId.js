const mongoose = require('mongoose');
const TransactionBaseSchema = require('./transactionBase');

const TransactionRecordWithDuplicatedIdSchema = TransactionBaseSchema({
    business: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TransactionRecordWithDuplicatedId', TransactionRecordWithDuplicatedIdSchema);
