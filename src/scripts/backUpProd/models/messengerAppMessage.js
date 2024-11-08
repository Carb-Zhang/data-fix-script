const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessengerMessageSchema = new Schema(
    {
        // messenger provider
        provider: {
            type: String,
        },
        // receive messenger phone number
        phone: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
        },
        // the content of sms
        message: {
            type: String,
        },
        // the 3rd unique id for this message.
        msgId: {
            type: String,
        },
        // messenger status: 'pending' 'sent' 'failure' 'delivered' 'read' 'deleted'
        status: {
            type: String,
            required: true,
            enum: ['pending', 'sent', 'failure', 'delivered', 'notDelivered', 'read', 'deleted'],
        },
        type: {
            type: String,
            required: true,
        },
        templateId: {
            type: String,
        },
        templateParams: {
            type: [String],
        },
        lang: {
            type: String,
            required: true,
        },
        // request service name, example: otp
        source: {
            type: String,
            required: true,
        },
        // the price of the messenger from messenger provider
        amount: {
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

MessengerMessageSchema.index(
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

MessengerMessageSchema.index(
    {
        provider: 1,
    },
    {
        partialFilterExpression: {
            provider: {
                $exists: true,
            },
        },
    },
);
// auto expired after 6 months
// db.messages.createIndex( { "createdTime": 1 }, { expireAfterSeconds: 15552000 } )
MessengerMessageSchema.index(
    {
        createdTime: 1,
    },
    {
        expireAfterSeconds: 15552000,
    },
);

module.exports = mongoose.model('MessengerMessage', MessengerMessageSchema);
