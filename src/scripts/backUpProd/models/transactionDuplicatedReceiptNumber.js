const mongoose = require('mongoose');
const TransactionBaseSchema = require('./transactionBase');

const TransactionDuplicatedReceiptNumber = TransactionBaseSchema({
    duplicatedReceiptNumber: {
        type: String
    },
    // to record the registerId of the POS who uploaded the trx
    uploadedBy: {
        type: String
    }
});

TransactionDuplicatedReceiptNumber.index({ transactionId: 1 });

module.exports = function(businessName) {
    if (businessName) {
        return mongoose.model(
            'TransactionDuplicatedReceiptNumber',
            TransactionDuplicatedReceiptNumber,
            'TransactionDuplicatedReceiptNumber_' + businessName,
        );
    } else {
        return mongoose.model('TransactionDuplicatedReceiptNumber', TransactionDuplicatedReceiptNumber);
    }
};
