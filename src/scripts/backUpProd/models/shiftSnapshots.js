const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PaymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    paymentMethodId: {
        type: Number,
        required: true,
    },
    isDeposit: {
        type: Boolean,
        default: false,
    },
    roundedAmount: {
        type: Number,
    },
    subType: {
        type: String,
    },
    isVoided: {
        type: Boolean,
    },
    onlinePaymentMethod: {
        type: String,
    },
    cashTendered: {
        type: Number,
    },
});

const ShiftSnapshotsSchema = new Schema({
    shiftId: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    transactionId: {
        type: String,
        required: true,
    },
    preOrderId: {
        type: String,
    },
    receiptNumber: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    registerId: {
        type: ObjectId,
    },
    isCancelled: {
        type: Boolean,
        default: false,
    },
    payments: {
        type: [PaymentSchema],
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
    timestamps: {
        createdAt: 'createdTime',
    },
});

ShiftSnapshotsSchema.index({
    shiftId: 1,
});
ShiftSnapshotsSchema.index({
    business: 1,
});
ShiftSnapshotsSchema.index({
    transactionId: 1,
});
ShiftSnapshotsSchema.index({
    preOrderId: 1,
});
ShiftSnapshotsSchema.index({
    receiptNumber: 1,
});

module.exports = mongoose.model('shiftSnapshots', ShiftSnapshotsSchema);