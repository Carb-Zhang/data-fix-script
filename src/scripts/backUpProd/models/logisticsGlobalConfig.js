"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LogisticsGlobalConfigSchema = new mongoose_1.Schema({
    enablePreorder: {
        type: Boolean,
    },
    enableOnfleetUrgentMode: {
        type: Boolean,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
});
const LogisticsGlobalConfigModel = (0, mongoose_1.model)('LogisticsGlobalConfig', LogisticsGlobalConfigSchema);
exports.default = LogisticsGlobalConfigModel;
