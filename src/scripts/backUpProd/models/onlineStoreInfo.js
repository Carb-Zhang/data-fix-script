const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const CustomPageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
        },

        version: {
            type: Number,
        },

        lastPublishTime: {
            type: Date,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

const AnalyticToolsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        trackingId: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

const bankingDetailsSchema = new Schema({
    bankName: {
        type: String,
    },
    bankCode: {
        type: String,
    },
    bankAccountNumber: {
        type: String,
    },
    beneficiaryAccountName: {
        type: String,
    },
    beneficiaryAddress: {
        type: String,
    },
    beneficiaryPhoneNumber: {
        type: String,
    },
    bankAddress: {
        type: String,
    },
});

const bannerSchema = new Schema({
    imgId: {
        type: String,
    },
    redirectType: {
        type: String,
    },
    redirectTarget: {
        type: String,
    },
});

const offlinePaymentBankAccountsSchema = new Schema({
    bankName: {
        type: String,
        required: true,
    },

    bankAccountName: {
        type: String,
        required: true,
    },

    bankAccountNumber: {
        type: String,
        required: true,
    },

    ordering: {
        type: Number,
        required: true,
    },
});

const offlinePaymentInstructionsSchema = new Schema({
    additionalNotes: {
        type: String,
    },

    //value can be email, facebook, line, whatsapp, viber
    enabledContactInfo: {
        type: [String],
    },
});

const onlinePaymentOptionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    additionalInfo: {
        type: Mixed,
    },

    isDisabled: {
        type: Boolean,
    },
});

const lineInfo = new Schema({
    personalLine: {
        type: String,
    },

    officialLine: {
        type: String,
    },

    usePersonalLine: {
        type: Boolean,
        default: true,
    },
});

const viberInfo = new Schema({
    personalViber: {
        type: String,
    },

    officialViber: {
        type: String,
    },

    usePersonalViber: {
        type: Boolean,
        default: true,
    },
});

const facebookInfo = new Schema({
    pageId: {
        type: String,
    },
    language: {
        type: String,
    },
    themeColor: {
        type: String,
    },
    greetingMessage: {
        type: String,
    },
});

const socialMediaInfoSchema = new Schema({
    twitter: {
        type: String,
    },

    facebook: {
        type: facebookInfo,
    },

    instagram: {
        type: String,
    },

    youtube: {
        type: String,
    },

    whatsapp: {
        type: String,
    },

    line: {
        type: lineInfo,
    },

    viber: {
        type: viberInfo,
    },
});

const customizeCommissionRatesSchema = new Schema({
    ecommerce: {
        type: Number,
    },
    beepInStore: {
        type: Number,
    },
    beepDelivery: {
        type: Number,
    },
    beepPickup: {
        type: Number,
    },
    beepTakeaway: {
        type: Number,
    },
});

const OnlineStoreInfoSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },

        beepBrandName: {
            type: String,
        },

        beepProfileImage: {
            type: String,
        },

        firstEnableDate: {
            type: Date,
        },

        lastEnableDate: {
            type: Date,
        },

        firstPublishDate: {
            type: Date,
        },

        lastPublishDate: {
            type: Date,
        },

        bankingDetails: {
            type: bankingDetailsSchema,
        },

        storeName: {
            type: String,
        },

        operationHours: {
            type: String,
        },

        phone: {
            type: String,
        },

        alternatePhone1: {
            type: String,
        },

        alternatePhone2: {
            type: String,
        },

        state: {
            type: String,
        },

        street: {
            type: String,
        },

        aboutStore: {
            type: String,
        },

        email: {
            type: String,
        },

        postcode: {
            type: String,
        },

        hasLogo: {
            type: Boolean,
        },

        banners: {
            type: [bannerSchema],
        },

        featuredProducts: {
            type: [String],
        },

        themeColor: {
            type: String,
        },

        pages: {
            type: [CustomPageSchema],
        },

        customDomain: {
            type: String,
        },

        //connecting, connected, failed
        connectStatus: {
            type: String,
        },

        logo: {
            type: String,
        },

        favicon: {
            type: String,
        },

        analyticTools: {
            type: [AnalyticToolsSchema],
        },

        enabledChatType: {
            type: String,
        },

        socialMediaInfo: {
            type: socialMediaInfoSchema,
        },

        offlinePaymentBankAccounts: {
            type: [offlinePaymentBankAccountsSchema],
        },

        offlinePaymentInstructions: {
            type: offlinePaymentInstructionsSchema,
        },

        onlinePaymentOptions: {
            type: [onlinePaymentOptionSchema],
        },

        customizeCommissionRates: {
            type: customizeCommissionRatesSchema,
        },
        facebookDomainVerification: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

OnlineStoreInfoSchema.path('business').index({ unique: true });
OnlineStoreInfoSchema.index({ customDomain: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('OnlineStoreInfo', OnlineStoreInfoSchema);
