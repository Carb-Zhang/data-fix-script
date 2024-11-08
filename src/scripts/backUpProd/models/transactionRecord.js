/**
 * Created with JetBrains WebStorm.
 * User: mac
 * Date: 13-3-24
 * Time: 下午9:23
 * To change this template use File | Settings | File Templates.
 */

// TransactionRecord is one collection per business
// Add comment: this schema for offline transaction records only
const mongoose = require('mongoose');
const modelByName = require('./modelByName')
const TransactionBaseSchema = require('./transactionBase');

const TransactionSchema = TransactionBaseSchema({
    // for searching
    revertedReceiptNumber: {
        type: String
    },
    takeawayId: String,
});

TransactionSchema.index({ business: 1, registerId: 1, transactionId: 1 }, { unique: true });
TransactionSchema.index({ business: 1, receiptNumber: 1 }, { unique: true, partialFilterExpression: { receiptNumber: { $exists: true}}});
TransactionSchema.index({ business: 1, originalReceiptNumber:1 }, { partialFilterExpression: { originalReceiptNumber: { $exists: true}}});
TransactionSchema.index('items.productId');
TransactionSchema.index('employeeNumber');
TransactionSchema.index({ business: 1, createdTime: 1});
TransactionSchema.index({ business: 1, failedToUpdateInventory:1 }, { sparse: true });
TransactionSchema.index({ business: 1, modifiedTime: 1});
TransactionSchema.index('customerId', { sparse: true });
TransactionSchema.index({ business: 1, 'returnProcess.completedTime': 1}, { sparse: true });
TransactionSchema.index({ business: 1, _id: 1, originalId: 1});

TransactionSchema.index({ business: 1, revertedReceiptNumber: 1 });
TransactionSchema.index({ 'inventoryChangeMsgTrackInfo.sendMsgStartAt': 1 });
TransactionSchema.index(
    {
        lastUploadedTime: -1,
        business: 1,
        customerId: 1,
        failedToSendMembershipStatsQueue: 1,
    },
    {
        partialFilterExpression: {
            lastUploadedTime: {
                $exists: true,
            },
            customerId: {
                $exists: true,
            },
        },
    },
);

module.exports = TransactionSchema;
