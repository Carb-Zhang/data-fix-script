const mongoose = require('mongoose');
const StoreSchema = require('./store.js');
const TransactionBaseSchema = require('./transactionBase');
const AddressSchema = require('./address');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const LocationSchema = require('./location');

const SubOrderSchema = new Schema({
    comments: String,
    submitId: {
        type: String,
        required: true,
    },
    submittedTime: {
        type: Date,
        required: true,
    },
    isPrinted: Boolean,
    printedTime: Date,
    submittedBy: String,
    submittedFrom: {
        type: String,
        required: true,
    },
    submittedByPhone: String,
});

const AddressBaseSchema = AddressSchema({
    addressId: {
        type: String,
    },
});

const PickupSchema = new Schema({
    // For store information screenshot
    store: {
        type: StoreSchema,
    },
});

const DeliveryMethodInfoSchema = new Schema({
    shippingZoneId: {
        type: String,
    },
    shippingZoneName: {
        type: String,
    },
    deliveryMethodId: {
        type: String,
    },
    deliveryMethodName: {
        type: String,
    },
    rate: {
        type: Number,
    },
    minShippingTime: {
        type: Number,
    },
    maxShippingTime: {
        type: Number,
    },
    shippingTimeUnit: {
        type: String,
    },
    isFree: {
        type: Boolean,
    },
});

const DeliverySchema = new Schema({
    courier: {
        type: String,
    },
    useStorehubLogistics: {
        type: Boolean,
    },
    trackingId: {
        type: String,
    },
    shippingFee: {
        type: Number,
    },
    deliveryMethodInfo: {
        type: DeliveryMethodInfoSchema,
    },
    address: {
        type: AddressBaseSchema,
    },
    comments: {
        type: String,
    },
    driverPhone: {
        type: String,
    },
    trackingUrl: {
        type: String,
    },
    jobId: {
        type: String,
    },
    deliveryFee: {
        type: Number,
    },
    deliveryDistance: {
        type: Number,
    },
    deliveryDistanceUnit: {
        type: String,
    },
    rideTypeMerchantSetup: {
        type: String,
    },
    bestLastMileETA: {
        type: Date,
    },
    worstLastMileETA: {
        type: Date,
    },
});

const ContactDetailSchema = new Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    /**
     * special required, example
     * IC
     * passport
     * temperature
     */
    info: {
        type: Mixed,
    },
});

const MerchantSettingsSchema = new Schema({
    includingTaxInDisplay: {
        type: Boolean,
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
    enableCashback: {
        type: Boolean,
    },
});

const OrderDisplayFields = new Schema({
    total: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    subtotal: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    serviceCharge: {
        type: Number,
    },
});

const KdsSyncInfoSchema = new Schema({
    syncTime: {
        type: Date,
        default: null,
    },
    syncRegisterId: {
        type: String,
    },
});

const OnlineTransactionSchema = TransactionBaseSchema(
    {
        consumerId: {
            type: String,
        },
        sessionId: {
            type: String,
        },
        status: {
            type: String,
            required: true,
        },
        shippingType: {
            // BEEP VOUCHER: digital
            // BEEP: dineIn pickup takeaway delivery
            // EC: pickup delivery
            type: String,
            enums: ['digital', 'dineIn', 'pickup', 'takeaway', 'delivery'],
        },
        shippingFee: {
            type: Number,
        },
        shippingFeeDiscount: {
            type: Number,
        },
        contactDetail: {
            type: ContactDetailSchema,
        },
        pickupInformation: {
            type: [PickupSchema],
        },
        deliveryInformation: {
            type: [DeliverySchema],
        },
        expectDeliveryDateFrom: {
            type: Date,
        },
        expectDeliveryDateTo: {
            type: Date,
        },
        billingAddress: {
            type: AddressBaseSchema,
        },
        pendingPaymentStartTime: {
            type: Date,
        },
        proofFiles: {
            type: [String],
        },
        clientId: {
            type: String,
        },
        deviceId: {
            type: String,
        },
        isDisbursed: {
            type: Boolean,
        },
        // store's coordinates
        fromLocation: {
            type: LocationSchema,
        },
        createdVoucherCodes: {
            type: [String],
        },
        voucherValidDays: {
            type: Number,
        },
        fulfillDate: {
            type: Date,
        },
        pickupDate: {
            type: Date,
        },
        pendingClaimCashback: {
            type: Number,
        },
        orderSource: {
            type: String,
            enums: ['BeepApp', 'BeepSite', 'BeepStore', 'BeepTngMiniProgram', 'BeepGCashMiniProgram'],
        },
        delayReason: {
            type: String,
        },
        delayDetail: {
            type: String,
        },
        cancelReason: {
            type: String,
        },
        cancelReasonDetail: {
            type: String,
        },
        isPaidZero: {
            type: Boolean,
        },
        originalShippingType: {
            type: String,
        },
        isNextDayPreOrder: {
            type: Boolean,
            default: false,
        },
        paidDate: {
            type: Date,
        },
        subOrders: [SubOrderSchema],
        isPayLater: {
            type: Boolean,
            default: false,
        },
        subtotalTax: Number,
        smallOrderFee: {
            type: Number,
        },
        smallOrderFeeTax: Number,
        containerFee: {
            type: Number,
        },
        containerFeeTax: Number,
        platformServiceFee: Number,
        platformServiceFeeTax: Number,
        revenue: Number,
        otherFee: {
            type: Number,
        },
        merchantInfo: {
            type: MerchantSettingsSchema,
        },
        changedToOfflinePaymentNotifiedSMSCount: {
            type: Number,
        },
        notifiedSelfPickupSMSCount: {
            type: Number,
        },
        enabledGoogleReviewSMSCampaign: {
            type: Boolean,
        },
        printKitchenDocket: {
            type: Boolean,
        },
        printReceipt: {
            type: Boolean,
        },
        display: {
            type: OrderDisplayFields,
        },
        productsManualDiscount: {
            type: Number,
        },
        isSplittedFromReceiptNumber: {
            type: String,
        },
        // who splits the order
        isSplittedBy: {
            type: String,
        },
        kdsSyncInfo: {
            type: KdsSyncInfoSchema,
        },
        // the online BIR requirement to use this field to filter the online transaction
        onlineBIRDate: {
            type: Date,
        },
        deductInventoryMethod: {
            type: String,
        },
        version: Number,
        // dynamic
        urlType: {
            type: String,
		},
        cancelledDate: {
            type: Date,
        },
    },
    {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
);

OnlineTransactionSchema.index({ consumerId: 1, business: 1 }, { sparse: true });
OnlineTransactionSchema.index({ business: 1, storeId: 1 });
OnlineTransactionSchema.index({ business: 1, storeId: 1, createdTime: -1 });
OnlineTransactionSchema.index({ customerId: 1, business: 1 }, { sparse: true });
OnlineTransactionSchema.index({ business: 1, sessionId: 1 }, { sparse: true });
OnlineTransactionSchema.index('status');

OnlineTransactionSchema.index('items.productId');
OnlineTransactionSchema.path('receiptNumber').index({ sparse: true, unique: true });
OnlineTransactionSchema.path('originalReceiptNumber').index({ sparse: true });
OnlineTransactionSchema.index('modifiedTime');
OnlineTransactionSchema.index('returnProcess.completedTime', { sparse: true });
OnlineTransactionSchema.index(
    { business: 1, expectDeliveryDateFrom: 1 },
    { partialFilterExpression: { expectDeliveryDateFrom: { $exists: true } } },
);

OnlineTransactionSchema.index({ business: 1, channel: 1 });
OnlineTransactionSchema.index(
    { 'payments.paymentMethod': 1, 'payments.paymentGateway': 1 },
    { sparse: true },
);
OnlineTransactionSchema.index(
    { fulfillDate: 1 },
    { partialFilterExpression: { fulfillDate: { $exists: true } } },
);

OnlineTransactionSchema.index({ createdTime: -1, pickupDate: -1 }, { background: true });
OnlineTransactionSchema.index({ 'subOrders.submittedBy': 1 }, { background: true });
OnlineTransactionSchema.index(
    { business: 1, storeId: 1, registerId: 1, invoiceSeqNumber: 1 },
    {
        background: true,
        unique: true,
        partialFilterExpression: {
            registerId: { $exists: true },
            invoiceSeqNumber: { $gte: 1 },
        },
    },
);

OnlineTransactionSchema.index(
    { business: 1, storeId: 1, onlineBIRDate: 1 },
    {
        background: true,
        partialFilterExpression: {
            onlineBIRDate: { $exists: true },
        },
    },
);

OnlineTransactionSchema.index(
    { paidDate: -1, business: 1, customerId: 1, failedToSendToMembershipQueue: 1 },
    {
        background: true,
        partialFilterExpression: {
            paidDate: { $exists: true },
            customerId: { $exists: true },
        },
    },
);

OnlineTransactionSchema.index(
    { cancelledDate: -1, business: 1, customerId: 1, failedToSendToMembershipQueue: 1 },
    {
        background: true,
        partialFilterExpression: {
            cancelledDate: { $exists: true },
            customerId: { $exists: true },
        },
    },
);

module.exports = OnlineTransactionSchema;
