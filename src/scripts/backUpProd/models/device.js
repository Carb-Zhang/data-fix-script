const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    // unique device token for push
    token: {
        type: String,
    },
    // ios/android
    platform: {
        type: String,
    },
    // FCM/IOS
    pushPlatform: {
        type: String,
    },
    appModel: {
        type: String,
    },
    appVersion: {
        type: String,
    },
});

module.exports = DeviceSchema;
