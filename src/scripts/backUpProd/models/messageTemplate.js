const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageTemplateSchema = {
    // who's template
    business: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    // example: your captcha is #{param1}, your captcha is #{param2}
    content: {
        type: String,
        required: true,
    },
    // example: ['param1', 'param2']
    parameters: {
        type: [String],
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
};

module.exports = mongoose.model(
    'messageTemplate',
    new Schema(MessageTemplateSchema, {
        autoIndex: process.env.NODE_ENV === 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    }),
);
