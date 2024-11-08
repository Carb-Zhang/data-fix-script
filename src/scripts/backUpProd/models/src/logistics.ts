import { Document, Schema, model } from 'mongoose';

export interface Logistics {
    receiptNumber: string;
    business?: string;
    country?: string;
    state?: string;
    rideType?: string;
    rideTypeMerchantSetup?: string; // ???
    upbidType?: string;
    status?: string;
    trackingId?: string;
    trackingUrl?: string;
    deliveryDistance?: number;
    name: string;
    id?: string;
    jobUrl?: string;
    startAt?: Date;
    isTest?: boolean;
    isManual?: boolean;
    claimedBefore?: boolean;
    deliveryFee?: number;
    originalFee?: number;
    riderId?: string;
    riderName?: string;
    riderPhone?: string;
    bestLastMileETA?: Date;
    worstLastMileETA?: Date;
    pickUpLocation?: { coordinates: number[] };
    dropOffLocation?: { coordinates: number[] };
    riderClaimDistance?: number;
    riderClaimLocation?: { coordinates: number[] };
    riderPickedUpLocation?: { coordinates: number[] };
    riderCompleteLocation?: { coordinates: number[] };
    riderStraightDistanceToDropOff?: number;

    // Others
    teamId?: string;
    dependentId?: string;
    claimCheckPassCounts?: number;
    onfleetUnassignedCounts?: number;

    // Refactor Ignore
    isTimeoutSent?: boolean;
    isExpress?: boolean;
    expireAt?: Date;
    preOrderStartAt?: Date;
    isPreOrder?: boolean;
    isPreOrderConverted?: boolean;
    driverId?: string;
    isPickedUpBefore?: boolean;
    isOffStoreBefore?: boolean;
    isSendPreorderNotifications?: boolean;

    // Removed in logistics-app-svc
    onfleetLastCheckCompletionTime: Date;
}

export interface LogisticsDocument extends Logistics, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

const LogisticsSchema = new Schema(
    {
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
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'modifiedTime',
        },
    },
);

LogisticsSchema.index({ receiptNumber: 1, name: 1, id: 1 }, { unique: true });
LogisticsSchema.index({ name: 1, id: 1 });
LogisticsSchema.index({ isPreOrder: 1, isSendPreorderNotifications: 1 }, { sparse: true });
LogisticsSchema.index({ status: 1 }, { sparse: true });
LogisticsSchema.index({ country: 1 }, { sparse: true });
LogisticsSchema.index({ startAt: 1 });
LogisticsSchema.index({ createdTime: 1 });

const LogisticsModel = model<LogisticsDocument>('Logistics', LogisticsSchema);
export default LogisticsModel;
