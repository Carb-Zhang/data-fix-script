const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const QrCodeRecordSchema = new Schema({
    businessName: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    designType: {
        type: String,
        required: true
    },
    tableType: {
        type: String,
        enum: ["auto", "fromTable", "counterService"],
        required: true
    },
    tableList: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        required: true
    },
    fileId: {
        type: String,
    }
}, {
    autoIndex: process.env.NODE_ENV == "development",
    timestamps: {
        createdAt: "createdTime",
        updatedAt: "updatedTime"
    }
});

QrCodeRecordSchema.index({
    businessName: 1,
    storeId: 1,
    createdTime: 1
});

module.exports = mongoose.model("qrCodeRecords", QrCodeRecordSchema);