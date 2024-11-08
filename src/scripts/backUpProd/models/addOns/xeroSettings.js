
const mongoose = require('mongoose');
const AddOnSettingsSchema = require('./addOnSettings');

const TaxCodeSchema = new mongoose.Schema({
    taxCodeId: {
      type: String,
      required: true
    },
    taxCodeName: {
      type: String,
      required: true
    }
});

const AccountSchema = new mongoose.Schema({
    //xero account id
    id: {
        type: String,
        required: true
    },
    //xero account name
    name: {
        type: String,
        required: true
    },
    //xero account code
    code: {
        type: String,
        required: true
    },
    //xero account type
    type: {
        type: String,
        required: true
    }
    
})

const XeroSettingsSchema = AddOnSettingsSchema;
XeroSettingsSchema.add({
    oauthSessionHandle: {
        type: String
    },
    oauthExpiresAt: {
        type: Date
    },
    taxCodes: {
        type: [TaxCodeSchema]
    },
    accounts: {
        type: [AccountSchema]
    },
    organizationName: {
        type: String
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
    },
    expiresAt: {
        type: Number
    }
});

XeroSettingsSchema.index({ requestToken: 1 });
module.exports = mongoose.model('XeroSettings', XeroSettingsSchema);