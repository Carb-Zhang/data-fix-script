const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsumerFacebookSchema = new Schema({
    id: String,
    token: String,
});

const NotificationSettingsSchema = new Schema({
    newsPush: {
        type: Boolean,
        default: true,
    },
    newsSms: {
        type: Boolean,
        default: true,
    },
    newsEmail: {
        type: Boolean,
        default: true,
    },
    promotionalPush: {
        type: Boolean,
        default: true,
    },
    promotionalSms: {
        type: Boolean,
        default: true,
    },
    promotionalEmail: {
        type: Boolean,
        default: true,
    },
});

const ConsumerDeleteFeedbackSchema = new Schema({
    reasons: {
        type: [String],
    },
    comment: {
        type: String,
    },
});

const ConsumerSchema = new Schema(
    {
        phone: {
            type: String,
        },
        membership: {
            type: [String],
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['female', 'male'],
        },
        birthday: {
            type: Date,
        },
        birthdayModifiedTime: {
            type: Date,
        },
        password: {
            type: String,
        },
        facebook: {
            type: ConsumerFacebookSchema,
        },
        defaultShippingAddressId: {
            type: String,
        },
        unverifiedPhone: {
            type: String,
        },
        mergedTo: {
            type: String,
        },
        hasUsedCleverTapVersion: {
            type: Boolean,
        },
        latestAppVersion: {
            type: String,
        },
        registrationTouchpoint: {
            type: String,
        },
        registrationSource: {
            type: String,
        },
        notificationSettings: {
            type: NotificationSettingsSchema,
        },
        alcoholConsentTime: {
            type: Date,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deleteFeedback: {
            type: ConsumerDeleteFeedbackSchema,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

ConsumerSchema.index({ phone: 1 }, { unique: true, sparse: true });
ConsumerSchema.index({ email: 1 }, { unique: true, sparse: true });
ConsumerSchema.index({ 'facebook.id': 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Consumer', ConsumerSchema);
