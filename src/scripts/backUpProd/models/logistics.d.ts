import { Document } from 'mongoose';
export interface Logistics {
    receiptNumber: string;
    business?: string;
    country?: string;
    state?: string;
    rideType?: string;
    rideTypeMerchantSetup?: string;
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
    pickUpLocation?: {
        coordinates: number[];
    };
    dropOffLocation?: {
        coordinates: number[];
    };
    riderClaimDistance?: number;
    riderClaimLocation?: {
        coordinates: number[];
    };
    riderPickedUpLocation?: {
        coordinates: number[];
    };
    riderCompleteLocation?: {
        coordinates: number[];
    };
    riderStraightDistanceToDropOff?: number;
    teamId?: string;
    dependentId?: string;
    claimCheckPassCounts?: number;
    onfleetUnassignedCounts?: number;
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
    onfleetLastCheckCompletionTime: Date;
}
export interface LogisticsDocument extends Logistics, Document {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}
declare const LogisticsModel: import("mongoose").Model<LogisticsDocument, {}, {}>;
export default LogisticsModel;
