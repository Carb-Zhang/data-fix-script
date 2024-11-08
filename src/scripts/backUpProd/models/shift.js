const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const TransactionsPerPayment = new Schema({
  paymentMethod: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const ShiftPayout = new Schema({
  actedBy: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // We only support Payout at the beginning and added Pay In later.
  // The schema is reused but the field was named payoutTime. It means event time for Pay In or Payout
  payoutTime: {
    type: Date,
    required: true,
  },
  // Added payType with Pay In. Would be 0 for Payout and 1 for Pay In
  payType: {
    type: Number,
    //For old data created by versions before Pay In added, read it as 0 by default
    default: 0,
  },
  comment: {
    type: String,
  },
  type: {
    type: String,
  },
});

const TaxSummarySchema = new Schema({
  taxCodeId: {
    type: String
  },
  name: {
    type: String
  },
  rate: {
    type: Number
  },
  amount: {
    type: Number
  }
})

const StatisticsSummarySchema = new Schema({
    amount: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    }
  });

const BeepSummarySchema = new Schema({
  sales: {
    type: StatisticsSummarySchema,
    required: true
  },
  returns: {
    type: StatisticsSummarySchema,
    required: true
  },
});

const BeepShiftSchema = new Schema({
  transactionCount: {
    type: Number,
    required: true
  },
  // Sum(Sales subtotal)
  grossSales: {
    type: Number,
    required: true
  },
  // Sum(Returns subtotal)
  return: {
    type: Number,
    required: true
  },
  // Sum(Sales discount) - Sum(Returns discount)
  discount: {
    type: Number,
    required: true
  },
  // Sum(Sales subtotal) - Sum(Returns subtotal) - discount
  netSales: {
    type: Number,
    required: true
  },
  // Sum(Sales service charge) - Sum(Returns service charge)
  serviceCharge: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  // Sum(Sales total) - Sum(Returns total)
  totalTendered: {
    type: Number,
    required: true
  },
  discountSummary: {
    type: BeepSummarySchema,
    required: true
  },
  paymentSummary: {
    type: BeepSummarySchema,
    required: true
  },
  serviceChargeSummary: {
    type: BeepSummarySchema,
    required: true
  },
  taxSummary: {
    type: [TaxSummarySchema]
  },
  // { sales: {amount: 0, count: 0}, cancel: {amount: 0, count: 0} }
  loyaltyDiscounts: {
    type: Mixed
  },
});

const ShiftSchema = new Schema({
  shiftId: {
    type: String,
    required: true
  },
  business: {
    type: String,
    required: true
  },
  registerId: {
    type: String,
    required: true
  },
  registerObjectId: {
    type: String
  },
  storeId: {
    type: String,
    required: true
  },
  openTime: {
    type: Date,
    required: true
  },
  closeTime: {
    type: Date,
    required: true
  },
  openingAmount: {
    type: Number,
    required: true
  },
  closingAmount: {
    type: Number,
    required: true
  },
  openBy: {
    type: String
  },
  closeBy: {
    type: String,
    required: true
  },
  //sales doesn't include rounded amount
  sales: {
    type: [TransactionsPerPayment]
  },
  //returns doesn't include rounded amount
  returns: {
    type: [TransactionsPerPayment]
  },
  deposits: {
    type: [TransactionsPerPayment]
  },
  salesRoundedAmount: {
    type: Number
  },
  returnsRoundedAmount: {
    type: Number
  },
  cashSalesRoundedAmount: {
    type: Number
  },
  cashReturnsRoundedAmount: {
    type: Number
  },
  discountedCount: {
    type: Number
  },
  discountedAmount: {
    type: Number
  },
  cancelledCount: {
    type: Number
  },
  cancelledAmount: {
    type: Number
  },
  payouts: {
    type: [ShiftPayout]
  },
  payIns: {
    type: [ShiftPayout]
  },
  isAccountingSynced: {
    type: Boolean
  },
  //id is: {transactionType}_{paymentMethod}, e.g. Sale_Cash, value is true or false to indicate whether it's synced or not
  detailAccountingSyncStatus: {
    type: Mixed
  },
  taxSummary: {
    type: [TaxSummarySchema]
  },
  // { "sales": { "amount": x1, "count", y1 }, "refunds": { "amount": x2, "count": y2 } }
  serviceCharge: {
    type: Mixed
  },
  // This field was originally used by qbo integration, now it's shared by xero and other future accounting tools integration.
  qboInvoiceId: {
    type: String
  },
  qboSyncTime: {
    type: Number
  },
  //a copy of minNo in cashRegister; to record this field in the case that the register is deleted but still need it's minNo.
  minNo: {
    type: String
  },
  beepShift: BeepShiftSchema,
  // { sales: {amount: 0, count: 0}, returns: {amount: 0, count: 0}, cancel: {amount: 0, count: 0} }
  loyaltyDiscounts: {
    type: Mixed
  },
  enableCashback: {
    type: Boolean,
  },
  transactionCount: {
    type: Number,
  },
  beepTransactionIds: {
    type: [String],
  },
  registerTransactionIds: {
    type: [String],
  },
  beepTransactions: {
    type: Mixed,
  },
  registerTransactions: {
    type: Mixed,
  },
  totalSalesAmount: {
    type: Number,
  },
  registerAppVersion: {
    type: String,
  }
}, {
  autoIndex: process.env.NODE_ENV == 'development'
});

ShiftSchema.index({business: 1, shiftId: 1}, {unique: true});
ShiftSchema.index({business: 1, openTime: 1, storeId: 1});

module.exports = ShiftSchema;
