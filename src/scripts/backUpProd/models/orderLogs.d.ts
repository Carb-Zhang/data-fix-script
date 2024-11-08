import { Document, Model } from 'mongoose';

export interface OrderLogsSchema extends Document {
    receiptNumber: string
    time?: Date,
    type?: string, // optional values: [ "status_updated" ]
    info?: any,
    operatorId?: string, // optional source: [ customerId, employeeId ]
    operatorType?: string, // optional values: [ "employee", "customer" ]
    operatorName?: string,
    createdTime?: Date,
    modifiedTime?: Date,
}

declare const OrderLogs: Model<OrderLogsSchema>;

export default OrderLogs;
