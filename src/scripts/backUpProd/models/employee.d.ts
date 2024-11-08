import { ObjectID } from 'bson';
import { Model, Document } from 'mongoose';
import { PasswordSettingTokenSchema } from './passwordSettingToken';

import { DeviceSchema } from "./device";

export interface EmployeeSchema extends Document {
    employerName?: string;

    firstName?: string;

    lastName?: string;

    employeeNumber?: number;

    email?: string;

    passwordHash?: string;

    phone?: string;

    managerAccess?: boolean;

    cashierAccess?: boolean;

    backOfficeAccess?: boolean;

    limitBackOfficeAccess?: boolean;

    backOfficeDetailAccesses?: string[];

    accessAllStores?: boolean;

    assignedStores?: string[];

    passwordSettingTokens?: PasswordSettingTokenSchema[];

    modifiedTime?: string;

    createdTime?: string;

    isDeleted?: boolean;

    lastCheckAlerts?: string;

    //{ event_type: array of store ObjectId string  }, e.g. { stock_low: [ storeId1, storeId2] }
    emailNotifications?: any;

    languagePreference?: string;

    isTutorialDone?: boolean;

    devices?: DeviceSchema[]
}

declare const Employee: Model<EmployeeSchema>;
export default Employee;
