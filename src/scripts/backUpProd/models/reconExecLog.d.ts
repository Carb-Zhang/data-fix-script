import { Document } from 'mongoose';
interface ReconExecLog extends Document {
    createdTime?: Date;
    modifiedTime?: Date;
    execStatus: string;
    startDate: Date;
    endDate: Date;
    error?: string;
}
declare const ReconExecLogModel: import("mongoose").Model<ReconExecLog, {}, {}>;
export default ReconExecLogModel;
