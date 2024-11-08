const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Mixed = Schema.Types.Mixed;

const SettingsSchema = new Schema({
  businessName: {
    type: String,
    required: true
  },
  firstConnected: {
    type: Boolean,
    default: true
  },
  //Possible Values: Running, Paused, Stopped
  status: {
    type: String
  },
  requestToken: {
    type: String
  },
  requestTokenSecret: {
    type: String
  },
  accessToken: {
    type: String
  },
  accessTokenSecret: {
    type: String
  },
  companyId: {
    type: String
  },
  isAllProductsMatched: {
    type: Boolean,
    default: false
  },
  hasRequestedStart: {
    type: Boolean
  },
  
  startTime: {
    type: Date
  },
  //Possible values are:
  //unmatched_tax
  //unmatched_payment
  //unmatched_product
  //no_default_tax
  //other (when QBO API returns 4xx error during push)
  pauseReason: {
    type: String
  },

  unmappedTaxCode: {
    type: String
  },

  customerId: {
    type: String
  },

  //used for refund records
  refundFromAccountId: {
    type: String
  },

  taxCodeMapping: Mixed,

  paymentMethodMapping: Mixed,

  accountMapping: Mixed
}, {
  autoIndex: process.env.NODE_ENV == 'development'
});
SettingsSchema.index({businessName: 1});

module.exports = SettingsSchema;