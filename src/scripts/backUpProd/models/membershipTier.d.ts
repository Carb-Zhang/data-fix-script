import { Document, Model, Types } from 'mongoose';

export interface MembershipTier {
    business: string;

    name: string;

    level: number;

    spendingThreshold: number;

    cashbackRate?: number; // cashback rate percentage, with 20 denoting 20%

    pointRate?: number; // points exchange rate percentage, with 20 denoting 20%

    pointsThreshold?: number; // points threshold for this tier
}

export interface MembershipTierDocument extends Document, MembershipTier {
    id: string;
    createdTime: Date;
    modifiedTime: Date;
}

declare const MembershipTier: Model<MembershipTierDocument>;
export default MembershipTier;
