import { Document, Model } from 'mongoose';

export interface LogisticsLocationSchema extends Document {
    jobId: string;
    receiptNumber: string;
    riderId: string;
    time: Date;
    coordinates: [number, number];
}

declare const LogisticsLocations: Model<LogisticsLocationSchema>;

export default LogisticsLocations;
