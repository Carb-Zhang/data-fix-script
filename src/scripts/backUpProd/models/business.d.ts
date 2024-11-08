import { Model, Document } from 'mongoose';
import { StoreSchema } from './store';
import { CashRegisterSchema } from './cashRegister';
import { OwnerTransferTokenSchema } from './ownerTransferToken';

export interface TaxCodeSchema {
    name?: string;

    rate?: number;

    isDeleted?: boolean;

    isVatExempted?: boolean;
}

export interface PaymentOptionSchema {
    paymentId?: number;

    name?: string;

    //custom, qrCode
    type?: string;

    //qrCodeProvider: Boost
    //qrCodeType: dynamic, customer
    //Boost: merchantId:, outletId:, posId:
    additionalInfo?: any;

    isDeleted?: boolean;

    isDisabled?: boolean;

    ordering?: number;

    stores?: string[];

    cashRegisters?: string[];
}

export interface NagBarSchema {
    isPickupOnly?: Boolean;

    isNagBarHide?: Boolean;
}

export interface FixedFeeSetting {
    isEnabled: boolean;
    fulfillmentOption: string;
    amount: number;
    appliedStores: string[];
}

export interface QROrderingSettingsSchema {
    minimumConsumption?: number;

    enableDelivery?: boolean;

    validDays?: number[];

    validTimeFrom?: string;

    validTimeTo?: string;

    defaultShippingZoneId?: string;

    defaultShippingZoneMethodId?: string;

    deliveryRadius?: number;

    useStorehubLogistics?: boolean;

    enableLiveOnline?: boolean;

    sellPork?: boolean;

    sellAlcohol?: boolean;

    sellNonHalalFood?: boolean;

    enablePreOrder?: boolean;

    searchingTags?: string[];

    marketingTags?: string[];

    disableTodayPreOrder?: boolean;

    hideFromBeepCom?: boolean;

    firstEnableDeliveryDate?: Date;

    firstEnablePreOrderDeliveryDate?: Date;

    enablePayByCash?: boolean;

    storesEnabledPayByCash?: string[];

    enablePayLater?: boolean;

    storesEnabledPayLater?: string[];

    fixedFeeSettings?: FixedFeeSetting[];

    disableGuestLogin?: boolean;
}

export interface CashbackExpirationDuration {
    durationNumber: number;
    durationUnit: string;
}

export interface BusinessSchema extends Document {
    name: string;

    email?: string;

    displayBusinessName?: string;

    phone?: string;

    country?: string;

    currency?: string;

    timezone?: string;

    taxRate?: number;

    includingTaxInDisplay?: boolean;

    storesWithFixedSupplierPrice?: string[];

    isSupplierPriceFixedForAllStores?: boolean;

    taxCodes?: TaxCodeSchema[];

    //ObjectId string of the tax code
    defaultTaxCode?: string;

    stores?: StoreSchema[];

    cashRegisters?: CashRegisterSchema[];

    createdTime: Date;

    trialEnds?: string;

    status?: string;

    specialSubscription: boolean;
    //Trial, Active, Expired
    subscriptionStatus?: string;

    subscriptionId?: string;

    chargeBeeCustomerId?: string;

    planId?: string;

    billingCurrency?: string;

    creditCardType?: string;

    maskedCardNumber?: string;

    creditCardExpiryDate?: string;

    enableSMSNotifications?: boolean;

    //key is event name, value is object { enabled: true/false, message: string of message text }
    smsNotifications?: any;

    plivoAuthId?: string;

    plivoAuthToken?: string;

    smsFrom?: string;

    enableLoyalty?: boolean;

    defaultLoyaltyRatio?: number;

    assignTableID?: boolean;

    integrationApiToken?: string;

    //temporary switch before weight-based pricing model is GA
    enableWeights?: boolean;

    kitchenPrinters?: string;

    defaultKitchenPrinter?: string;

    separateKitchenItems?: boolean;

    orderSummaryPrinter?: string;

    autoOrderId?: boolean;

    paidRegisters?: number;

    notRenewing?: boolean;

    subscriptionEndDate?: string;

    enableRounding?: boolean;

    roundingTo?: number;

    coupon?: string;

    hasCreditedReferrer?: boolean;

    totalSubFeePaid?: number;

    enableServiceCharge?: boolean;

    serviceChargeRate?: number;

    serviceChargeTax?: string;

    nextBillingDate?: Date;

    smsCredits?: number;

    smsCreditsLow?: boolean;

    otherMPOSEnabled?: boolean;

    paymentOptions?: PaymentOptionSchema[];

    disabledDefaultPayments?: string[];

    added60DaysFreeSmsCredits?: boolean;

    businessStatus?: string;

    // retail
    // cafe
    // restaurant
    // ecommerce
    // other
    //this field may contain other values due to legacy data
    businessType?: string;

    hasDeviceType?: string;

    useStoreHubPay?: boolean;

    sequentialReceiptNumber?: boolean;

    roundAllTransactions?: boolean;

    enableMultipleIpads?: boolean;

    extraStoreOldPricingQuota?: number;

    trialExtraRegister?: number;

    paidExtraRegisters?: number;

    paidExtraStores: number;

    permanentOldPricingExtraStores?: boolean;

    ownerTransferTokens?: OwnerTransferTokenSchema[];

    //0: no store
    //1: one store
    //2: 2 or 2+
    numberOfStores?: Number;

    lastChargeBeeEventTime?: Date;

    //Building pilot feature to allow users adding/editing products from POS directly for Singha deal,
    //this setting is to control the feature on/off
    allowEditProductsOnPOS?: boolean;

    maxOfflineDays?: Number;

    enablePax?: boolean;

    isOnline?: boolean;

    isOnlineStorePublished?: boolean;

    isOnlineStoreRequested?: boolean;

    /** accouting system's customer code **/
    sqlAccoutingCode?: string;

    autocountAccountingCode?: string;

    /** accouting system's customer code **/
    operationHours?: number;

    //For customers signed up with the deal specific register URLs, record the Hubspot Id contained in the URL.
    //This Id will later be used for validation, and validated customers can request activition from BackOffice.
    hubSpotDealId?: number;

    //If user has clicked Skip button of the online store easy enablement popup. If this is true, the page would
    //never popup again.
    skipEasyEnablement?: boolean;

    //Timestamp for las time the online store easy enablement poped up. It's used for counting time pass for next
    //time the page would pop up.
    lastPopupEasyEnablement?: number;

    mrr?: number;

    isQROrderingEnabled?: boolean;

    enableCashback?: boolean;

    disableCashbackFromPOS?: boolean;

    claimCashbackLimit?: boolean;

    claimCashbackCountPerDay?: number;

    nagBar?: NagBarSchema;

    enableThirdParty?: string;

    facebookId?: string;

    lastEnableCashbackDate?: Date;

    firstEnableCashbackDate?: Date;

    qrOrderingSettings?: QROrderingSettingsSchema;

    cashbackTrialExpiryDate?: Date;

    cashbackClaimTrailCount?: number;

    cashbackClaimPlanUsed?: number;

    cashbackClaimTopUpUsed?: number;

    cashbackClaimTopUpTotal?: number;

    cashbackClaimAutoRefill?: boolean;

    cashbackPopedUpEmployees?: string[];

    cashbackTrailExpiredAlertClosed?: boolean;

    cashbackTrailStartedAlertClosed?: boolean;

    enableReportDriver?: boolean;

    enableTakeaway?: boolean;

    takeawayCharge?: number;

    addonIds?: string[];

    isOnJIMACForBIR?: boolean;

    allowAnonymousQROrdering?: boolean;

    campaignTrialEndTime?: number;

    existingCampaignUser?: boolean;

    isAutoSms?: boolean;

    autoLowSmsCredits?: number;

    autoRechargeSmsCredits?: number;

    autoSmsCreditsDiscountInfoId?: string;

    lockedSmsCredits?: number;

    smsCreditsAvgCost?: number;

    lastMaxBarcode?: number;

    cashbackExpirationDuration?: CashbackExpirationDuration;

    membershipEnabled?: boolean;

    firstMembershipEnabledTime?: Date;

    lastMembershipDisabledTime?: Date;

    pointsEnabled?: boolean;

    claimPointsCountPerDay?: number;

    firstPointsEnabledTime?: Date;

    lastPointsDisabledTime?: Date;

    enableOnlineChannelsInPaymentsReport?: boolean;

    isInventoryWebhookEnabled?: boolean;

    isPositiveInvStockManageEnabled?: boolean;
}
declare const Business: Model<BusinessSchema>;
export default Business;
