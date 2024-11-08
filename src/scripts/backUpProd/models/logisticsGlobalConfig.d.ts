import { Document } from 'mongoose';
export interface LogisticsGlobalConfig {
    enablePreorder: boolean;
    enableOnfleetUrgentMode: boolean;
}
export interface LogisticsGlobalConfigDocument extends LogisticsGlobalConfig, Document {
    id: string;
}
declare const LogisticsGlobalConfigModel: import("mongoose").Model<LogisticsGlobalConfigDocument, {}, {}>;
export default LogisticsGlobalConfigModel;
