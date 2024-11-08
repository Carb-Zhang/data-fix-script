import { Document, Model } from 'mongoose';

export interface LogisticsErrorsSchema extends Document {
    partnerName : string;
    statusCode: number;
    behaviourType : string;
    time: Date;
}

declare const LogisticsErrors: Model<LogisticsErrorsSchema>;

export default LogisticsErrors;
