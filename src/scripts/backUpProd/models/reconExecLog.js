"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReconExecLogSchema = new mongoose_1.Schema({
    execStatus: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    error: {
        type: String,
    },
}, {
    autoIndex: process.env.NODE_ENV === 'development',
    timestamps: {
        createdAt: 'createdTime',
        updatedAt: 'modifiedTime',
    },
});
const ReconExecLogModel = (0, mongoose_1.model)('ReconExecLog', ReconExecLogSchema);
exports.default = ReconExecLogModel;
