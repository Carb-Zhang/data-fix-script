'use strict';
exports.__esModule = true;
exports.EInvoiceDocumentType =
    exports.EInvoiceStatus =
    exports.RequestorType =
    exports.RequestType =
        void 0;
var mongoose_1 = require('mongoose');
var RequestType;
(function (RequestType) {
    RequestType['REQUEST_INVOICE'] = 'REQUEST_INVOICE';
    RequestType['REQUEST_REFUND'] = 'REQUEST_REFUND';
    RequestType['CANCEL_INVOICE'] = 'CANCEL_INVOICE';
    RequestType['CONSOLIDATE_INVOICE'] = 'CONSOLIDATE_INVOICE';
    RequestType['CONSOLIDATE_REFUND'] = 'CONSOLIDATE_REFUND';
})((RequestType = exports.RequestType || (exports.RequestType = {})));
var RequestorType;
(function (RequestorType) {
    RequestorType['CUSTOMER'] = 'CUSTOMER';
    RequestorType['EMPLOYEE'] = 'EMPLOYEE';
    RequestorType['SYSTEM'] = 'SYSTEM';
})((RequestorType = exports.RequestorType || (exports.RequestorType = {})));
var EInvoiceStatus;
(function (EInvoiceStatus) {
    EInvoiceStatus['REJECT'] = 'REJECT';
    EInvoiceStatus['SUBMITTED'] = 'SUBMITTED';
    EInvoiceStatus['VALID'] = 'VALID';
    EInvoiceStatus['CANCEL'] = 'CANCEL';
})((EInvoiceStatus = exports.EInvoiceStatus || (exports.EInvoiceStatus = {})));
var EInvoiceDocumentType;
(function (EInvoiceDocumentType) {
    EInvoiceDocumentType['INVOICE'] = 'INVOICE';
    EInvoiceDocumentType['REFUND'] = 'REFUND';
    EInvoiceDocumentType['CONSOLIDATE_INVOICE'] = 'CONSOLIDATE_INVOICE';
    EInvoiceDocumentType['CONSOLIDATE_REFUND'] = 'CONSOLIDATE_REFUND';
})((EInvoiceDocumentType = exports.EInvoiceDocumentType || (exports.EInvoiceDocumentType = {})));
var eInvoiceRequestRecordSchema = new mongoose_1.Schema(
    {
        business: String,
        storeId: String,
        receiptNumbers: [String],
        isOnline: Boolean,
        // request info
        requestType: { type: String, enum: Object.values(RequestType) },
        rawRequestInfo: mongoose_1.Schema.Types.Mixed,
        addOnRequestInfo: mongoose_1.Schema.Types.Mixed,
        requestor: {
            requestorType: { type: String, enum: Object.values(RequestorType) },
            requestorId: String,
        },
        // submit info
        submitContent: mongoose_1.Schema.Types.Mixed,
        eInvoiceDocumentType: { type: String, enum: Object.values(EInvoiceDocumentType) },
        // result
        requestResult: {
            eInvoiceStatus: { type: String, enum: Object.values(EInvoiceStatus) },
            statusUpdatedAt: Date,
            submitId: String,
            documentId: String,
            documentLongId: String,
            errorMessage: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: true,
    },
);
eInvoiceRequestRecordSchema.index({ business: 1, receiptNumbers: 1 });
eInvoiceRequestRecordSchema.index({ 'requestResult.statusUpdatedAt': -1 });
exports['default'] = (0, mongoose_1.model)('eInvoiceRequestRecord', eInvoiceRequestRecordSchema);
