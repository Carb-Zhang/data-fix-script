/**
 * Created by LF on 05/07/2017.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DeletedRegisterSchema = new Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        registerId: {
            type: Number,
            required: true,
        },
        registerObjectId: {
            type: ObjectId,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV === 'development',
    },
);

DeletedRegisterSchema.index({ businessName: 1, registerId: 1 });

module.exports = mongoose.model('DeletedRegister', DeletedRegisterSchema);
