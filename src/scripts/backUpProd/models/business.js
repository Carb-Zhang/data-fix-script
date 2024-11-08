/**
 * Created with JetBrains WebStorm.
 * User: mac
 * Date: 13-3-24
 * Time: 下午1:38
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const StoreSchema = require('./store.js');
const CashRegisterSchema = require('./cashRegister.js');
const OwnerTransferTokenSchema = require('./ownerTransferToken.js');

const TaxCode = new Schema({
    name: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
    },
    isVatExempted: {
        type: Boolean,
        default: false,
    },
});

const Addon = new Schema({
    id: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});

const PaymentOptionSchema = new Schema({
    paymentId: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    //custom, qrCode
    type: {
        type: String,
    },
    //qrCodeProvider: Boost
    //qrCodeType: dynamic, customer
    //Boost: merchantId:, outletId:, posId:
    additionalInfo: {
        type: Mixed,
    },
    isDeleted: {
        type: Boolean,
    },
    isDisabled: {
        type: Boolean,
    },
    ordering: {
        type: Number,
    },
    stores: {
        type: [String],
    },
    cashRegisters: {
        type: [String],
        default: ['All'],
    },
});

const NagBarSchema = new Schema({
    isPickupOnly: {
        type: Boolean,
        default: false,
    },
    isNagBarHide: {
        type: Boolean,
        default: false,
    },
});

const QROrderingSettingsSchema = new Schema({
    minimumConsumption: {
        type: Number,
    },
    enableDelivery: {
        type: Boolean,
    },
    firstEnableDeliveryDate: {
        type: Date,
    },
    validDays: {
        type: [Number],
        default: [2, 3, 4, 5, 6],
    },
    // moment format HH:mm
    validTimeFrom: {
        type: String, // moment
        default: '10:00',
    },
    // moment format HH:mm
    validTimeTo: {
        type: String,
        default: '22:00',
    },
    useStorehubLogistics: {
        type: Boolean,
    },
    defaultShippingZoneId: {
        type: String,
    },
    defaultShippingZoneMethodId: {
        type: String,
    },
    // unit km
    deliveryRadius: {
        type: Number,
    },
    enableLiveOnline: {
        type: Boolean,
    },
    enableDeliveryLiveOnline: {
        type: Boolean,
    },
    sellPork: {
        type: Boolean,
    },
    sellAlcohol: {
        type: Boolean,
    },
    sellNonHalalFood: {
        type: Boolean,
    },
    enablePreOrder: {
        type: Boolean,
    },
    firstEnablePreOrderDeliveryDate: {
        type: Date,
    },
    searchingTags: {
        type: [String], // Array of searching tagName
        default: [],
    },
    marketingTags: {
        type: [String], // Array of marketing tagName
        default: [],
    },
    disableTodayPreOrder: {
        type: Boolean,
    },
    hideFromBeepCom: {
        type: Boolean,
    },
    enablePayByCash: {
        type: Boolean,
        default: false,
    },
    storesEnabledPayByCash: {
        type: [String],
        default: [],
    },
    enablePayLater: {
        type: Boolean,
        default: false,
    },
    storesEnabledPayLater: {
        type: [String],
        default: [],
    },
    disableGuestLogin: {
        type: Boolean,
    },
});

const FixedFeeSetting = new Schema({
    isEnabled: {
        type: Boolean,
        default: false,
    },
    fulfillmentOption: {
        type: String,
        enum: ['delivery', 'pickup', 'dineIn', 'takeaway'],
    },
    amount: {
        type: Number,
    },
    // All, means apply to all stores
    // specific storeIds
    appliedStores: {
        type: [String],
    },
});

const ExcludeServiceChargeProductCondition = new Schema({
    isEnabled: {
        type: Boolean,
        default: false,
    },
    conditionsMatch: {
        type: String,
        required: true,
    },
    conditions: [{
        _id: false,
        type: {
            type: String,
            required: true,
        },
        operator: {
            type: String,
        },
        operand: {
            default: [],
            type: [String],
        }
    }]
});

const BusinessSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        displayBusinessName: {
            type: String,
        },
        phone: {
            type: String,
        },
        country: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        timezone: {
            type: String,
        },
        taxRate: {
            type: Number,
        },
        includingTaxInDisplay: {
            type: Boolean,
        },
        storesWithFixedSupplierPrice: {
            type: [String],
        },
        isSupplierPriceFixedForAllStores: {
            type: Boolean,
            default: false,
        },
        taxCodes: {
            type: [TaxCode],
        },
        //ObjectId string of the tax code
        defaultTaxCode: {
            type: String,
        },
        stores: {
            type: [StoreSchema],
            require: true,
        },
        cashRegisters: {
            type: [CashRegisterSchema],
        },
        createdTime: {
            type: Date,
            require: true,
            default: Date.now,
        },
        trialEnds: {
            type: Date,
        },
        status: {
            type: String,
        },
        //Trial, Active, Expired
        subscriptionStatus: {
            type: String,
        },
        subscriptionId: {
            type: String,
        },
        specialSubscription: {
            type: Boolean,
            default: false,
        },
        billingPeriodChanged: {
            type: Boolean,
            default: false,
        },
        // to record how many months in a row a user has exceeded the revenue limit of lite plan
        litePlanExceedLimitMonths: {
            type: Number,
        },
        // last time (in timestamp), system was checking the revenue of a lite plan user
        lastRevenueCheckingTime: {
            type: Number,
        },
        chargeBeeCustomerId: {
            type: String,
        },
        planId: {
            type: String,
        },
        addonIds: {
            type: [String],
        },
        addons: {
            type: [Addon],
        },
        billingCurrency: {
            type: String,
        },
        creditCardType: {
            type: String,
        },
        maskedCardNumber: {
            type: String,
        },
        creditCardExpiryDate: {
            type: String,
        },
        creditCardModifiedDate: {
            type: Date,
        },
        enableSMSNotifications: {
            type: Boolean,
            default: false,
        },
        //key is event name, value is object { enabled: true/false, message: string of message text }
        smsNotifications: {
            type: Mixed,
        },
        plivoAuthId: {
            type: String,
        },
        plivoAuthToken: {
            type: String,
        },
        smsFrom: {
            type: String,
        },
        enableLoyalty: {
            type: Boolean,
            default: false,
        },
        defaultLoyaltyRatio: {
            type: Number,
            default: 20,
        },
        assignTableID: {
            type: Boolean,
        },
        integrationApiToken: {
            type: String,
        },
        //temporary switch before weight-based pricing model is GA
        enableWeights: {
            type: Boolean,
        },
        kitchenPrinters: {
            type: String,
        },
        defaultKitchenPrinter: {
            type: String,
        },
        separateKitchenItems: {
            type: Boolean,
            default: false,
        },
        orderSummaryPrinter: {
            type: String,
            default: '',
        },
        autoOrderId: {
            type: Boolean,
            default: false,
        },
        paidRegisters: {
            type: Number,
        },
        notRenewing: {
            type: Boolean,
        },
        subscriptionStartDate: {
            type: Date,
        },
        subscriptionEndDate: {
            type: Date,
        },
        enableRounding: {
            type: Boolean,
        },
        roundingTo: {
            type: Number,
        },
        coupon: {
            type: String,
        },
        hasCreditedReferrer: {
            type: Boolean,
        },
        totalSubFeePaid: {
            type: Number,
        },
        enableServiceCharge: {
            type: Boolean,
        },
        serviceChargeRate: {
            type: Number,
        },
        serviceChargeTax: {
            type: String,
        },
        excludeServiceChargeProductCondition: {
            type: ExcludeServiceChargeProductCondition
        },
        nextBillingDate: {
            type: Date,
        },
        smsCredits: {
            type: Number,
        },
        smsCreditsLow: {
            type: Boolean,
        },
        otherMPOSEnabled: {
            type: Boolean,
        },
        paymentOptions: {
            type: [PaymentOptionSchema],
        },
        disabledDefaultPayments: {
            type: [String],
        },
        added60DaysFreeSmsCredits: {
            type: Boolean,
        },
        businessStatus: {
            type: String,
        },

        // retail
        // cafe
        // restaurant
        // ecommerce
        // other
        businessType: {
            //this field may contain other values due to legacy data
            type: String,
        },
        hasDeviceType: {
            type: String,
        },
        useStoreHubPay: {
            type: Boolean,
        },
        sequentialReceiptNumber: {
            type: Boolean,
        },
        roundAllTransactions: {
            type: Boolean,
        },
        enableMultipleIpads: {
            type: Boolean,
        },
        extraStoreOldPricingQuota: {
            type: Number,
        },

        trialExtraRegister: {
            type: Number,
        },

        paidExtraRegisters: Number,
        paidExtraStores: {
            type: Number,
            default: 0,
        },
        permanentOldPricingExtraStores: Boolean,
        ownerTransferTokens: {
            type: [OwnerTransferTokenSchema],
        },
        //0: no store
        //1: one store
        //2: 2 or 2+
        numberOfStores: Number,
        lastChargeBeeEventTime: Date,
        //Building pilot feature to allow users adding/editing products from POS directly for Singha deal,
        //this setting is to control the feature on/off
        allowEditProductsOnPOS: Boolean,
        maxOfflineDays: Number,
        enablePax: Boolean,

        isOnline: {
            type: Boolean,
            default: false,
        },

        isOnlineStorePublished: {
            type: Boolean,
            default: false,
        },

        isOnlineStoreRequested: {
            type: Boolean,
            default: false,
        },

        /** accouting system's customer code **/
        sqlAccoutingCode: {
            type: String,
        },

        autocountAccountingCode: {
            type: String,
        },
        /** accouting system's customer code **/

        operationHours: {
            type: Number,
            default: 0,
        },

        //For customers signed up with the deal specific register URLs, record the Hubspot Id contained in the URL.
        //This Id will later be used for validation, and validated customers can request activition from BackOffice.
        hubSpotDealId: {
            type: Number,
        },
        //If user has clicked Skip button of the online store easy enablement popup. If this is true, the page would
        //never popup again.
        skipEasyEnablement: {
            type: Boolean,
            default: false,
        },
        //Timestamp for las time the online store easy enablement poped up. It's used for counting time pass for next
        //time the page would pop up.
        lastPopupEasyEnablement: {
            type: Number,
            default: 0,
        },
        mrr: {
            type: Number,
        },
        qrOrderingSettings: QROrderingSettingsSchema,
        isQROrderingEnabled: {
            type: Boolean,
            default: false,
        },
        lastEnableQROrderingDate: {
            type: Date,
        },
        firstEnableQROrderingDate: {
            type: Date,
        },
        enableCashback: {
            type: Boolean,
            default: false,
        },
        disableCashbackFromPOS: {
            type: Boolean,
            default: false,
        },
        claimCashbackLimit: {
            type: Boolean,
            default: false,
        },
        claimCashbackCountPerDay: {
            type: Number,
            default: 0,
        },
        nagBar: {
            type: NagBarSchema,
        },
        enableThirdParty: {
            type: String,
        },
        facebookId: {
            type: String,
        },
        lastEnableCashbackDate: {
            type: Date,
        },
        firstEnableCashbackDate: {
            type: Date,
        },
        cashbackTrialExpiryDate: {
            type: Date,
        },
        cashbackClaimTrailCount: {
            type: Number,
            default: 0,
        },
        cashbackClaimPlanUsed: {
            type: Number,
            default: 0,
        },
        cashbackClaimTopUpUsed: {
            type: Number,
            default: 0,
        },
        cashbackClaimTopUpTotal: {
            type: Number,
            default: 0,
        },
        cashbackClaimAutoRefill: {
            type: Boolean,
            default: false,
        },
        cashbackPopedUpEmployees: {
            type: [String],
            default: [],
        },
        cashbackTrailExpiredAlertClosed: {
            type: Boolean,
            default: false,
        },
        cashbackTrailStartedAlertClosed: {
            type: Boolean,
            default: false,
        },
        enableOnlineStoreFeature: {
            type: Boolean,
        },
        enableQROrderingFeature: {
            type: Boolean,
        },
        enableReportDriver: {
            type: Boolean,
            default: true,
        },
        enableTakeaway: {
            type: Boolean,
            default: false,
        },
        takeawayCharge: {
            type: Number,
        },
        fixedFeeSettings: {
            type: [FixedFeeSetting],
        },
        enableGroupItem: {
            type: Boolean,
            default: true,
        },
        ongoingSubscriptionOrderId: {
            type: String,
        },
        advanceInvoiceId: {
            type: String,
        },
        activatedAt: {
            //first time activated
            type: Date,
        },
        isOnJIMACForBIR: {
            type: Boolean,
            default: false,
        },
        remainingTrialPeriod: {
            type: Number,
        },
        remainingTrialPeriodAdded: {
            type: Boolean,
        },
        allowAnonymousQROrdering: {
            type: Boolean,
            default: false,
        },
        isEnableBeepQrEmailSent: {
            type: Boolean,
        },
        campaignEnabledTime: {
            type: Number,
        },
        campaignTrialStartDate: {
            type: Date,
        },
        isAutoSms: {
            type: Boolean,
            default: false,
        },
        autoRechargeSmsCredits: {
            type: Number,
        },
        autoLowSmsCredits: {
            type: Number,
        },
        autoSmsCreditsDiscountInfoId: {
            type: String,
        },
        campaignTrialEndTime: {
            type: Number,
        },
        existingCampaignUser: {
            type: Boolean,
        },
        lockedSmsCredits: {
            type: Number,
        },
        smsCreditsAvgCost: {
            type: Number,
        },
        cashbackExpirationDuration: {
            durationNumber: {
                type: Number,
            },
            //days,weeks,months
            durationUnit: {
                type: String,
            },
        },
        lastMaxBarcode: {
            type: Number,
            default: 100000,
        },
        membershipEnabled: {
            type: Boolean,
            default: false,
        },
        firstMembershipEnabledTime: {
            type: Date,
        },
        lastMembershipDisabledTime: {
            type: Date,
        },
        pointsEnabled: {
            type: Boolean,
            default: false,
        },
        claimPointsCountPerDay: {
            type: Number,
            default: 0,
        },
        firstPointsEnabledTime: {
            type: Date,
        },
        lastPointsDisabledTime: {
            type: Date,
        },
        industry: {
            type: String,
        },
        enableOnlineChannelsInPaymentsReport: {
            type: Boolean,
        },
        isInventoryWebhookEnabled: {
            type: Boolean,
        },
        isPositiveInvStockManageEnabled: Boolean,
    },
    {
        id: false,
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

BusinessSchema.path('name').index({ unique: true });
BusinessSchema.path('email').index({ unique: true });
BusinessSchema.path('status').index({ sparse: true });
BusinessSchema.index({ name: 1, 'stores.name': 1 }, { unique: true });
BusinessSchema.index({ subscriptionId: 1 }, { unique: true, sparse: true });
BusinessSchema.index({ meteredBillingSubId: 1 }, { unique: true, sparse: true });
BusinessSchema.index('cashRegisters.token', { sparse: true });
BusinessSchema.index({ name: 1, 'cashRegisters.registerId': 1 }, { unique: true });
BusinessSchema.path('smsFrom').index({ sparse: true, unique: true });
BusinessSchema.index({ createdTime: 1 });
BusinessSchema.index(
    { 'stores.location': '2dsphere' },
    { partialFilterExpression: { 'stores.location': { $exists: true } } },
);
BusinessSchema.index(
    { 'cashRegisters.location': '2dsphere' },
    { partialFilterExpression: { 'cashRegisters.location': { $exists: true } } },
);
BusinessSchema.index({ 'qrOrderingSettings.searchingTags': 1 });
BusinessSchema.index(
    { 'qrOrderingSettings.marketingTags': 1 },
    {
        background: true,
        partialFilterExpression: { 'qrOrderingSettings.marketingTags.0': { $exists: true } },
    },
);
BusinessSchema.index({ membershipEnabled: 1 });

module.exports = BusinessSchema;
