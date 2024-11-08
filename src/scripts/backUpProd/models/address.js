const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = require('./location');

const AddressSchema = {
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    // address = addressDetails + deliveryTo
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: false,
    },
    postCode: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    companyName: {
        type: String,
        required: false,
    },
    // delivery address info except address details info.
    deliveryTo: {
        type: String,
    },
    location: LocationSchema,
    // detail address info, example: Unit 8, Level 7.
    addressDetails: {
        type: String,
    },
};

module.exports = function (additions) {
    const AddressBaseSchema = new Schema(AddressSchema, {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    });
    if (additions) {
        AddressBaseSchema.add(additions);
    }
    return AddressBaseSchema;
};
