const mongoose = require('mongoose');
const AddressSchema = require('./address');

const AddressBookSchema = AddressSchema({
    userId: {
        type: String,
        required: true,
    },
});

AddressBookSchema.index({ userId: 1 });

module.exports = mongoose.model('AddressBook', AddressBookSchema);
