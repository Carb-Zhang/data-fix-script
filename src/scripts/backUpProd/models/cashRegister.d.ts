import { ObjectID } from 'bson';
import { LocationSchema } from './location';

interface DeviceInfoSchema {
    platform?: string;
    model?: string;
    version?: string;
}

export interface CashRegisterSchema {
    registerId?: number;

    storeId?: ObjectID;

    name?: string;

    activationCode?: number;

    isActivated?: boolean;

    token?: string;
    
    pushProvider?: string;

    //This is the bage number record for backoffice actions
    badgeNumber?: number;

    onlineBadgeNumber?: number;

    ecommerceBadgeNumber?: number;

    beepBadgeNumber?: number;

    quickSelectLayoutId?: ObjectID;

    apiToken?: string;

    oldApiToken?: string;

    appVersion?: string;

    platform?: string;

    model?: string;

    //Unique identification of a POS that applied from local tax appartment,
    //only applies to PH and TH accounts. For PH, it's the MIN and for TH it's the POS#
    minNo?: string;

    //serial number of the POS, only apply to PH accounts
    serialNo?: string;

    //permit to use of the POS, only apply to PH accounts
    ptu?: string;

    ptuDateIssued?: string;

    ptuValideUntil?: string;

    snsEndpointArn?: string;

    tableLayoutEnabled?: boolean;

    defaultTableLayoutSection?: string;

    location?: LocationSchema;

    // has deprecated
    device?: DeviceInfoSchema;

    trialPeriod?: number;
}
