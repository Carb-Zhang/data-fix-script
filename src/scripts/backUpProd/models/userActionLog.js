/**
 * Created by z on 4/23/15.
 */

const mongoose = require('mongoose');
const UserActionLogBaseSchema = require('./userActionLogBase');
const UserActionLogSchema = UserActionLogBaseSchema();

UserActionLogSchema.index({ business: 1, time: -1, action: 1 });
UserActionLogSchema.index({ business: 1, time: -1, storeId: 1 });
UserActionLogSchema.index({ business: 1, time: -1, registerId: 1 });
UserActionLogSchema.index({ business: 1, time: -1, user: 1 });
UserActionLogSchema.index({ business: 1, 'additionalInfo.transactionId': 1 }, { sparse: true });
UserActionLogSchema.index({ business: 1, notes: 'text', time: -1 });
UserActionLogSchema.index({ time: 1 }, { expireAfterSeconds: 15552000 })

module.exports = mongoose.model('UserActionLog', UserActionLogSchema);
