const mongoose = require('mongoose');
const AddressSchema = require('./address');

const BeepAddressSchema = AddressSchema({
    consumerId: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    addressName: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
    },
    comments: {
        type: String,
        required: false,
    },
    isDeleted: {
        type: Boolean,
    },
});

BeepAddressSchema.index({ consumerId: 1, isDeleted: 1 });

module.exports = mongoose.model('BeepAddress', BeepAddressSchema);
