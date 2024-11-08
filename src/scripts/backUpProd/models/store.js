/**
 * Created with JetBrains WebStorm.
 * User: mac
 * Date: 13-3-25
 * Time: 下午3:45
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const LocationSchema = require('./location');

const addressComponentSchema = new Schema({
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    street1: {
        type: String,
    },
    street2: {
        type: String,
    },
});

const pickupAddressSchema = new Schema({
    location: {
        type: String,
    },
    placeName: {
        type: String,
    },
    coordinate: {
        type: [Number],
    },
    addressComponents: {
        type: addressComponentSchema,
    },
    googleMapsPlaceId: {
        type: String,
    },
    googleMapsUrl: {
        type: String,
    },
});

const ReviewInfoSchema = new Schema({
    rating: {
        type: Number,
    },
    ratingCount: {
        type: Number,
    },
});

const VacationSchema = new Schema({
    vacationTimeFrom: {
        type: String,
    },

    vacationTimeTo: {
        type: String,
    },
});

const QROrderingSettingsSchema = new Schema({
    validDays: {
        type: [Number],
        default: [2, 3, 4, 5, 6],
    },
    // moment format HH:mm
    validTimeFrom: {
        type: String, // moment
        default: '10:00',
    },
    // moment format HH:mm
    validTimeTo: {
        type: String,
        default: '22:00',
    },
    breakTimeFrom: {
        type: String,
    },
    breakTimeTo: {
        type: String,
    },
    vacations: {
        type: [VacationSchema],
    },
    enablePerTimeSlotLimitForPreOrder: {
        type: Boolean,
        default: false,
    },
    maxPreOrdersPerTimeSlot: {
        type: Number,
    },
    enablePreOrder: {
        type: Boolean,
    },
    firstEnablePreOrderDeliveryDate: {
        type: Date,
    },
    disableTodayPreOrder: {
        type: Boolean,
    },
    disableOnDemandOrder: {
        type: Boolean,
    },
    pauseModeSettings: {
		shippingTypes: {
            type: [String]
        },
		endingAt: {
            type: Number
        }
	},
    enableSelfPickupAlert:{
        type: Boolean,
    }
});

const StoreSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        street1: {
            type: String,
            //required: true
        },
        street2: {
            type: String,
        },
        city: {
            type: String,
            //required: true
        },
        state: {
            type: String,
            //required: true
        },
        country: {
            type: String,
            //required: true
        },
        postalCode: {
            type: String,
        },
        phone: {
            type: String,
        },
        fax: {
            type: String,
        },
        email: {
            type: String,
        },
        website: {
            type: String,
        },
        notes: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
        },
        //For MY accounts, this is GST Id of the store
        //For PH accounts, this is TIN of the store
        gstId: {
            type: String,
        },
        sstId: {
            type: String,
        },
        brn: {
            type: String,
        },
        companyName: {
            type: String,
        },
        // Deprecated. Can be removed once migration is done.
        hasSupplyNeeds: {
            type: Boolean,
        },
        operationHours: {
            type: String,
        },
        /*
          Key is one of these action names, "deleteItem", "refund", "cancel", "discount", "openCloseShift" and "reprintReceipt".
          Value is access level:
          '0' means any cashier has access;
          '1' means it requires manager pin to access;
          '2' means it's completely disabled. Currently only discount can be completely disabled.
          For example, it can be like:
          {
            deleteItem : '1',
            refund : '0',
            cancel : '1',
            discount : '2',
            openCloseShift: '0',
            reprintReceipt: '0'
          }
        */
        cashierAccesses: {
            type: Mixed,
        },

        //indicate whether the store is VAT registered or not, only apply to PH accounts
        isVATRegistered: {
            type: Boolean,
        },

        //indicate whether the store is using BIR accredited version of POS, only apply to PH accounts
        isBIRAccredited: {
            type: Boolean,
        },

        // For merchant who had enabled BIR before online BIR feature is released, this field would be null.
        firstAccreditBIRTime: {
            type: Date
        },

        //Indicate whether the store has been requested to enable BIR compliance
        birRequested: {
            type: Boolean,
        },

        receiptTemplate: {
            type: String,
        },

        confirmBIRToken: {
            type: String,
        },

        isOnline: {
            type: Boolean,
        },

        fulfillmentOptions: {
            type: [String],
        },

        orderNotificationEmail: {
            type: String,
        },

        paidOrderNotification: {
            type: Boolean,
            default: true,
        },

        pendingPaymentOrderNotification: {
            type: Boolean,
            default: true,
        },

        pendingVerificationOrderNotification: {
            type: Boolean,
            default: true,
        },

        qrRegisters: {
            type: [String],
        },

        location: {
            type: LocationSchema,
        },

        beepBrandName: {
            type: String,
        },

        beepStoreNameLocationSuffix: {
            type: String,
        },

        /**
         * 0: F&B
         * 1: Retail
         */
        industry: {
            type: Number,
            default: 0,
        },
        enableDigital: {
            type: Boolean,
            default: false,
        },

        pickUpAddress: {
            type: pickupAddressSchema,
        },
        // for all beep settings
        qrOrderingSettings: QROrderingSettingsSchema,

        isMallIntegrationEnabled: {
            type: Boolean
        },
        mallIntegrationChannel: String,
        isOneZReadingPerDayEnabled: Boolean,
        eInvoiceSetting: {
            tin: String,
            industry: String,
            countryCode: String,
            stateCode: String,
            msicCode: String,
            msicDescription: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

module.exports = StoreSchema;
