'use strict';
exports.__esModule = true;
exports.TaskStatus = void 0;
var mongoose_1 = require('mongoose');
var TaskStatus;
(function (TaskStatus) {
    TaskStatus['AWAIT'] = 'AWAIT';
    TaskStatus['IN_PROCESS'] = 'IN_PROCESS';
    TaskStatus['FAIL'] = 'FAIL';
    TaskStatus['SUCCESS'] = 'SUCCESS';
})((TaskStatus = exports.TaskStatus || (exports.TaskStatus = {})));
var eInvoiceConsolidationTaskSchema = new mongoose_1.Schema({
    month: String,
    storeId: String,
    business: String,
    eInvoiceSettings: mongoose_1.Schema.Types.Mixed,
    status: { type: String, enum: Object.values(TaskStatus) },
    lastConsoledOrder: {
        isOnline: Boolean,
        orderId: String,
        receiptNumber: String,
        transactionType: String,
        createdTime: Date,
    },
    lastRequestRecordId: String,
    currentRunnerId: String,
    errorMessages: [
        {
            message: String,
            createdAt: Date,
        },
    ],
    startedAt: Date,
    finishedAt: Date,
    statusUpdatedAt: Date,
});
eInvoiceConsolidationTaskSchema.index({ month: 1, storeId: 1 }, { unique: true });
exports['default'] = (0, mongoose_1.model)(
    'eInvoiceConsolidationTask',
    eInvoiceConsolidationTaskSchema,
);
