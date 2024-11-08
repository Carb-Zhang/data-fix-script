import { Schema, Document } from 'mongoose';
import { LocationSchema } from './location';

export default Schema;

export interface addressComponentSchema {
    country?: string;

    state?: string;

    city?: string;

    street1?: string;

    street2?: string;
}

export interface pickupAddressSchema {
    location?: string;

    placeName?: string;

    coordinate?: number[];

    addressComponents?: string;

    googleMapsPlaceId?: string;

    googleMapsUrl?: string;
}

export interface ReviewInfoSchema {
    rating?: number;
    ratingCount?: number;
}

export interface VacationSchema {
    vacationTimeFrom?: string;
    vacationTimeTo?: string;
}

export interface PauseModeSettingsSchema {
    shippingTypes?: string[];
    endingAt?: number;
}

export interface QROrderingSettingsSchema {
    validDays?: number[];

    validTimeFrom?: string;

    validTimeTo?: string;

    breakTimeFrom?: string;

    breakTimeTo?: string;

    vacations: VacationSchema;

    enablePerTimeSlotLimitForPreOrder?: boolean;

    maxPreOrdersPerTimeSlot?: number;

    enablePreOrder?: boolean;

    firstEnablePreOrderDeliveryDate: Date;

    disableTodayPreOrder: boolean;

    disableOnDemandOrder: boolean;

    pauseModeSettings: PauseModeSettingsSchema;

    enableSelfPickupAlert: boolean;
}

export interface EInvoiceSetting {
    tin: string;
    industry: string;
    countryCode: string;
    stateCode: string;
    msicCode: string;
    msicDescription: string;
}

export interface StoreSchema extends Document {
    name?: string;

    street1?: string;

    street2?: string;

    city?: string;

    state?: string;

    country?: string;

    postalCode?: string;

    phone?: string;

    fax?: string;

    email?: string;

    website?: string;

    notes?: string;

    isDeleted?: boolean;

    //For MY accounts, this is GST Id of the store
    //For PH accounts, this is TIN of the store
    gstId?: string;

    sstId?: string;

    brn?: string;

    companyName?: string;

    // Deprecated. Can be removed once migration is done.
    hasSupplyNeeds?: boolean;

    operationHours?: string;

    /*
     Key is one of these action names, "deleteItem", "refund", "cancel", "discount", "openCloseShift" and "reprintReceipt".
     Value is access level:
     '0' means any cashier has access;
     '1' means it requires manager pin to access;
     '2' means it's completely disabled. Currently only discount can be completely disabled.
     For example, it can be like:
     {
       deleteItem : '1',
       refund : '0',
       cancel : '1',
       discount : '2',
       openCloseShift: '0',
       reprintReceipt: '0'
     }
     */
    cashierAccesses?: any;

    //indicate whether the store is VAT registered or not, only apply to PH accounts
    isVATRegistered?: boolean;

    //indicate whether the store is using BIR accredited version of POS, only apply to PH accounts
    isBIRAccredited?: boolean;

    // For merchant who had enabled BIR before online BIR feature is released, this field would be null.
    firstAccreditBIRTime?: Date;

    //Indicate whether the store has been requested to enable BIR compliance
    birRequested?: boolean;

    receiptTemplate?: string;

    confirmBIRToken?: string;

    isOnline?: boolean;

    fulfillmentOptions?: string[];

    orderNotificationEmail?: string;

    paidOrderNotification?: boolean;

    pendingPaymentOrderNotification?: boolean;

    pendingVerificationOrderNotification?: boolean;

    qrRegisters?: string[];

    location?: LocationSchema;

    beepBrandName?: string;

    beepStoreNameLocationSuffix?: string;

    industry?: number;

    pickUpAddress?: pickupAddressSchema;

    enableDigital?: boolean;

    qrOrderingSettings?: QROrderingSettingsSchema;

    birAccredited?: boolean;

    eInvoiceSetting?: EInvoiceSetting;
}
