const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const OrderLogSchema = new Schema(
    {
        receiptNumber: {
            type: String,
            required: true,
        },
        time: Date,
        type: String, // optional values: [ "status_updated" ]
        info: Mixed,
        operatorId: String, // optional source: [ customerId, employeeId ]
        operatorType: String, // optional values: [ "employee", "customer" ]
        operatorName: String,
        createdTime: Date,
        modifiedTime: Date,
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

OrderLogSchema.index({ receiptNumber: 1 });

module.exports = mongoose.model('OrderLogs', OrderLogSchema);
