"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LogisticsSchema = new mongoose_1.Schema({
    isTest: {
        type: Boolean,
    },
    isManual: {
        type: Boolean,
    },
    claimedBefore: {
        type: Boolean,
    },
    receiptNumber: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    rideType: {
        type: String,
    },
    // 'AUTO' or 'MANUAL'
    upbidType: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
    },
    status: {
        type: String,
    },
    deliveryFee: {
        type: Number,
    },
    originalFee: {
        type: Number,
    },
    trackingId: {
        type: String,
    },
    trackingUrl: {
        type: String,
    },
    jobUrl: {
        type: String,
    },
    business: {
        type: String,
    },
    startAt: {
        type: Date,
    },
    deliveryDistance: {
        type: Number,
    },
    riderId: {
        type: String,
    },
    riderName: {
        type: String,
    },
    riderPhone: {
        type: String,
    },
    riderClaimDistance: {
        type: Number,
    },
    bestLastMileETA: {
        type: Date,
    },
    worstLastMileETA: {
        type: Date,
    },
    riderClaimLocation: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },
    pickUpLocation: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },
    dropOffLocation: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },
    riderPickedUpLocation: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },
    riderCompleteLocation: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },
    riderStraightDistanceToDropOff: {
        type: Number,
    },
    // Other
    preOrderStartAt: {
        type: Date,
    },
    dependentId: {
        type: String,
    },
    driverId: {
        type: String,
    },
    teamId: {
        type: String,
    },
    isTimeoutSent: {
        type: Boolean,
        default: false,
    },
    isExpress: {
        type: Boolean,
    },
    onfleetUnassignedCounts: {
        type: Number,
        default: 0,
    },
    claimCheckPassCounts: {
        type: Number,
        default: 0,
    },
    isPickedUpBefore: {
        type: Boolean,
    },
    isOffStoreBefore: {
        type: Boolean,
    },
    rideTypeMerchantSetup: {
        type: String,
    },
    isPreOrder: {
        type: Boolean,
    },
    isPreOrderConverted: {
        type: Boolean,
    },
    isSendPreorderNotifications: {
        type: Boolean,
    },
    expireAt: {
        type: Date,
    },
    onfleetLastCheckCompletionTime: {
        type: Date,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
LogisticsSchema.index({ receiptNumber: 1, name: 1, id: 1 }, { unique: true });
LogisticsSchema.index({ name: 1, id: 1 });
LogisticsSchema.index({ isPreOrder: 1, isSendPreorderNotifications: 1 }, { sparse: true });
LogisticsSchema.index({ status: 1 }, { sparse: true });
LogisticsSchema.index({ country: 1 }, { sparse: true });
LogisticsSchema.index({ startAt: 1 });
LogisticsSchema.index({ createdTime: 1 });
const LogisticsModel = (0, mongoose_1.model)('Logistics', LogisticsSchema);
exports.default = LogisticsModel;
