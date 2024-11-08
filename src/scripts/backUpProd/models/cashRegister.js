/**
 * Created with JetBrains WebStorm.
 * User: mac
 * Date: 13-3-25
 * Time: 下午4:10
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const LocationSchema = require('./location');

const DeviceInfoSchema = new Schema({
    platform: {
        type: String
    },
    model: {
        type: String
    },
    version: {
        type: String
    },
});

const CashRegisterSchema = new Schema({
    registerId: {
        type: Number,
        required: true,
    },
    storeId: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
    },
    activationCode: {
        type: Number,
        required: true,
    },
    isActivated: {
        type: Boolean,
        required: true,
    },
    token: {
        type: String,
    },
    pushProvider: {
        type: String,
    },
    //This is the bage number record for backoffice actions
    badgeNumber: {
        type: Number,
        default: 0,
    },
    onlineBadgeNumber: {
        type: Number,
        default: 0,
    },
    ecommerceBadgeNumber: {
        type: Number,
        default: 0,
    },
    beepBadgeNumber: {
        type: Number,
        default: 0,
    },
    quickSelectLayoutId: {
        type: ObjectId,
    },
    apiToken: {
        type: String,
    },
    oldApiToken: {
        type: String,
    },
    appVersion: {
        type: String,
    },
    // iOS, Android
    platform: {
        type: String
    },
    model: {
        type: String
    },

    //Unique identification of a POS that applied from local tax appartment,
    //only applies to PH and TH accounts. For PH, it's the MIN and for TH it's the POS#
    minNo: {
        type: String,
    },

    //serial number of the POS, only apply to PH accounts
    serialNo: {
        type: String,
    },

    //permit to use of the POS, only apply to PH accounts
    ptu: {
        type: String,
    },

    ptuDateIssued: {
        type: String,
    },

    ptuValideUntil: {
        type: String,
    },

    snsEndpointArn: {
        type: String,
    },

    tableLayoutEnabled: {
        type: Boolean,
    },

    defaultTableLayoutSection: {
        type: String,
    },
    location: {
        type: LocationSchema,
    },
    // { platform:'Android', model:'GC082', version:'1.7.0' }
    device: {
        type: DeviceInfoSchema
    },

    trialPeriod: {
        type: Number,
    }

});

module.exports = CashRegisterSchema;
