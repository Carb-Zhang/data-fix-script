const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ItemSchema = require('./item.js');
const PurchasedItemOptionSchema = require('./purchasedItemOption.js');
const AppliedPromotionSchema = require('./appliedPromotion.js');
const LocationSchema = require('./location');
const CalculationFieldsSchema = require('./calculationFields');

const ReturnProcessSchema = new Schema({
    productId: {
        type: ObjectId,
        required: true,
    },
    skuNumber: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    actionRequired: {
        type: Boolean,
        required: true,
    },
    inventoryAction: {
        type: String,
    },
    comment: {
        type: String,
    },
    failedToUpdateInventory: {
        type: Boolean,
    },
    selectedOptions: {
        type: [PurchasedItemOptionSchema],
    },
    completedTime: {
        type: Date,
    },
    sn: {
        type: String,
    },
});

const ManualApproveSchema = new Schema({
    approver: {
        type: String,
    },
    approveDate: {
        type: Date,
    },
    approveReason: {
        type: String,
    },
});

const PaymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    // for e-wallet,should be qrProvider
    // for online payment,should mapping to ["card payment","Grabpay"] and etc.
    paymentMethod: {
        type: String,
        required: true,
    },
    isDeposit: {
        type: Boolean,
        default: false,
    },
    cashTendered: {
        type: Number,
    },
    roundedAmount: {
        type: Number,
    },
    subType: {
        type: String,
    },
    // online transactionId & offline mPos & eWallet
    mPOSTxnId: {
        type: String,
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    paymentGateway: {
        type: String,
    },
    cardName: {
        type: String,
    },
    cardNo: {
        type: String,
    },
    //manualApproveInfo would be saved if the payment is manually approved (pay with qrcode, but cannot proceed automatically)
    manualApproveInfo: {
        type: ManualApproveSchema,
    },

    // payment-api entrance
    paymentProvider: {
        type: String,
    },
    paymentProviderMID: {
        type: String,
    },
});

const LoyaltyDiscountSchema = new Schema({
    loyaltyType: {
        type: String,
        enum: ['cashback', 'storeCredit'],
    },
    displayDiscount: {
        type: Number,
    },
    discountedTax: {
        type: Number,
    },
    taxRate: {
        type: Number,
    },
    spentValue: {
        type: Number,
    },
});

const AppliedVoucherSchema = new Schema({
    voucherId: {
        type: String,
        required: true,
    },
    voucherCode: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    purchaseChannel: {
        type: String,
    },
    coveredBySH: {
        type: Boolean,
    },
});

const BirDiscountType = {
    ATHLETE_AND_COACH: 'ATHLETE_AND_COACH',
    MEDAL_OF_VALOR: 'MEDAL_OF_VALOR',
    DIPLOMAT: 'DIPLOMAT',
    SOLO_PARENT: 'SOLO_PARENT',
};

const TransactionSchema = {
    business: {
        type: String,
        required: true,
    },
    storeId: {
        type: ObjectId,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    registerId: {
        type: ObjectId,
    },
    registerNumber: {
        type: Number,
    },
    employeeNumber: {
        type: String,
    },
    items: {
        type: [ItemSchema],
        required: true,
    },
    loyaltyDiscounts: {
        type: [LoyaltyDiscountSchema],
    },
    enableCashback: {
        type: Boolean,
    },
    serviceChargeRate: {
        type: Number,
    },
    createdTime: {
        type: Date,
        required: true,
    },
    modifiedTime: {
        type: Date,
        required: true,
    },
    //total  = subtotal + tax - discount + roundedAmount + serviceCharge
    total: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },

    //discount = manual discount + promotion discounts
    discount: {
        type: Number,
        required: true,
    },

    promotions: {
        type: [AppliedPromotionSchema],
    },

    tax: {
        type: Number,
    },
    roundedAmount: {
        type: Number,
    },
    // ------- offline store ---
    // 1) Cash
    // 2) CreditCard
    // 3) Loyalty
    // 4) DebitCard
    // ------- ecommerce -------
    // 5) Online
    // 6) Offline
    paymentMethod: {
        type: String,
        index: true,
    },
    originalReceiptNumber: {
        type: String,
    },
    // 1) Sale
    // 2) Return
    // 3) PreOrder
    transactionType: {
        type: String,
    },
    comment: {
        type: String,
    },
    failedToUpdateInventory: {
        type: Boolean,
    },
    failedToUpdateLoyalty: {
        type: Boolean,
    },
    returnProcess: {
        type: [ReturnProcessSchema],
    },
    returnStatus: {
        type: String,
    },
    receiptNumber: {
        type: String,
    },

    //in PH, there're two sequence numbers, one is transaction number and each transaction has its own transaction number regardless sale or refund
    //one is invoice number which only applies to sale
    //sequenceNumber is transaction sequence number
    //invoiceSeqNumber is invoice sequence number
    sequenceNumber: {
        type: Number,
    },
    invoiceSeqNumber: {
        type: Number,
    },

    isCancelled: {
        type: Boolean,
        default: false,
    },
    cancelledBy: {
        type: String,
    },
    cancelledAt: {
        type: Date,
    },
    customerId: {
        type: String,
    },
    depositAmount: {
        type: Number,
    },
    pickUpDate: {
        type: Date,
    },
    preOrderDate: {
        type: Date,
    },
    preOrderBy: {
        type: String,
    },
    preOrderId: {
        type: String,
    },
    // If the transaction is cancelled, this field can be used to store cancel reason as well.
    returnReason: {
        type: String,
    },
    emailReceipt: {
        type: Boolean,
    },
    cashTendered: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    appVersion: {
        type: String,
    },
    serviceCharge: {
        type: Number,
    },
    payments: {
        type: [PaymentSchema],
    },
    headcount: {
        type: Number,
    },
    seniorsCount: {
        type: Number,
    },
    pwdCount: {
        type: Number,
    },
    //totalDeductedTax = tax deducted due to regular discounts + total exempted tax due to SC/PWD
    totalDeductedTax: {
        type: Number,
    },
    seniorDiscount: {
        type: Number,
    },
    pwdDiscount: {
        type: Number,
    },
    taxableSales: {
        type: Number,
    },
    taxExemptedSales: {
        type: Number,
    },
    zeroRatedSales: {
        type: Number,
    },
    serviceChargeTax: {
        type: Number,
    },
    pax: {
        type: Number,
    },
    // a copy from cashRegister.minNo; to record this field in the case that the register is deleted but still need it's minNo.
    minNo: {
        type: String,
    },
    location: {
        type: LocationSchema,
    },

    channel: {
        type: Number,
    },

    tableId: {
        type: String,
    },

    otherReason: {
        type: String,
    },

    pickUpId: {
        type: String,
    },
    appliedVoucher: {
        type: AppliedVoucherSchema,
    },
    takeawayCharges: {
        type: Number,
    },
    salesChannel: {
        type: Number,
    },
    receiptNumbersBeforeFix: {
        type: [String],
    },
    // order level fixed fee, config in BO
    fixedFee: {
        type: Number,
        default: 0,
    },
    addonBirCompliance: {
        discountType: {
            type: String,
            enum: Object.values(BirDiscountType),
        },
        athleteAndCoachDiscount: Number,
        medalOfValorDiscount: Number,
        soloParentDiscount: Number,
        collectedInfo: Schema.Types.Mixed,
    },
    seqNumberCreatedTime: {
        type: Date,
    },
    inventoryChangeMsgTrackInfo: {
        isSendMsg: Boolean,
        sendMsgStartAt: Date,
        eventId: String,
    },
    failedToSendMembershipStatsQueue: {
        type: Boolean,
    },
    lastUploadedTime: {
        type: Date,
    },
    pendingTime: {
        type: Date,
    },
    servedTime: {
        type: Date,
    },
    calculation: {
        type: CalculationFieldsSchema,
    },
    eInvoiceInfo: {
        eInvoiceStatus: String,
        statusUpdatedAt: Date,
        documentType: String,
        documentId: String,
    },
};

module.exports = function (additions, timestamps) {
    const TransactionBaseSchema = new Schema(TransactionSchema, {
        id: false,
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: timestamps,
    });
    if (additions) {
        TransactionBaseSchema.add(additions);
    }
    return TransactionBaseSchema;
};
