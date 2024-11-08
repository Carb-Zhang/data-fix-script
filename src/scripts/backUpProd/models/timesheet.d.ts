import { Model, Document } from 'mongoose';
import { ObjectId } from 'bson';

declare const Timesheet: Model<TimesheetSchema>;
export default Timesheet;

export interface TimesheetSchema extends Document {
    employeeId: ObjectId;

    storeId: string;

    clockInTime: Date;

    clockOutTime: Date;

    clockInImage?: string;

    clockOutImage?: string;
}
