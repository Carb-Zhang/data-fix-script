/**
 * Created by z on 6/7/14.
 */

const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Mixed = Schema.Types.Mixed
  , AddOnSettingsSchema = require('./addOnSettings');

const QBOTaxCodeSchema = new Schema({
  taxCodeId: {
    type: String,
    required: true
  },
  taxCodeName: {
    type: String,
    required: true
  }
}, {
  autoIndex: process.env.NODE_ENV == 'development'
})

const QBOPaymentMethodSchema = new Schema({
  paymentMethodId: {
    type: String,
    required: true
  },
  paymentMethodName: {
    type: String,
    required: true
  }
});

const QBOAccountSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  classification: {
    type: String
  }
})

//paymentMethodMapping: dictionary key is Cash/CreditCard, value is QBOPaymentMethodId

//taxCodeMapping: dictionary key is tax code ObjectId string in StoreHub, and value is QBO Tax id

//accountMapping: dictionary key is Deposit/Rounding/ServiceCharge/Loyalty, value is
//{ id: QBOAccountId,
//  productId: QBOProductId,
//  productName: QBOProductName,
//  syncToken: sync token (required for update)
//}

const QBOSettingsSchema = AddOnSettingsSchema;
QBOSettingsSchema.add({
  qboTaxCodes: {
    type: [QBOTaxCodeSchema],
  },
  qboPaymentMethods: {
    type: [QBOPaymentMethodSchema],
  },
  qboAccounts: {
    type: [QBOAccountSchema],
  },
  accessTokenExpiresIn: {
    type: Number
  },
  refreshTokenExpiresIn: {
    type: Number
  },
  refreshToken: {
    type: String
  },
  state: {
    type: String
  }
});

module.exports = mongoose.model('QBOSetting', QBOSettingsSchema);
