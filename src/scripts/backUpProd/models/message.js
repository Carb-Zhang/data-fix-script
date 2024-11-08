const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        // sms provider
        provider: {
            type: String,
        },
        // who send the msg
        business: {
            type: String,
        },
        // receive msg phone number
        phone: {
            type: String,
            required: true,
        },
        // the content of sms
        message: {
            type: String,
            required: true,
        },
        // the 3rd unique id for this message.
        msgId: {
            type: String,
        },
        // the 3rd ids
        msgIds: {
            type: [String],
        },
        // msg status: 'pending' 'sent' 'success' 'failure' 'delivered' 'notDelivered'
        status: {
            type: String,
            required: true,
            enum: ['pending', 'sent', 'success', 'failure', 'delivered', 'notDelivered'],
        },
        type: {
            type: String,
            required: true,
        },
        templateId: {
            type: String,
        },
        // request service name, example: otp
        source: {
            type: String,
            required: true,
        },
        units: {
            type: Number,
            validate: {
                validator: function (units) {
                    return Number.isInteger(units) && units > 0;
                },
                message: (props) => `${props.value} is not a integer, or less than 0.`,
            },
        },
        // the price of the sms from sms provider
        amount: {
            type: Number,
        },
        // the price of unit
        rate: {
            type: Number,
        },
        sentTime: {
            type: Date,
        },
        sentTimes: {
            type: Number,
            default: 0,
        },
    },
    {
        autoIndex: process.env.NODE_ENV === 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    },
);

MessageSchema.index(
    {
        msgId: 1,
    },
    {
        partialFilterExpression: {
            msgId: {
                $exists: true,
            },
        },
    },
);

MessageSchema.index(
    {
        msgIds: 1,
    },
    {
        partialFilterExpression: {
            msgIds: {
                $exists: true,
            },
        },
    },
);

MessageSchema.index(
    {
        msgId: 1,
        phone: 1,
        status: 1,
    },
    {
        partialFilterExpression: {
            msgId: {
                $exists: true,
            },
        },
    },
);

// auto expired after 6 months
// db.messages.createIndex( { "createdTime": 1 }, { expireAfterSeconds: 15552000 } )
MessageSchema.index(
    {
        createdTime: 1,
    },
    {
        expireAfterSeconds: 15552000,
    },
);

module.exports = mongoose.model('Message', MessageSchema);
