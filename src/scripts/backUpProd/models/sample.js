"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SampleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    autoIndex: process.env.NODE_ENV == 'development',
});
const SampleModel = (0, mongoose_1.model)('sample', SampleSchema);
exports.default = SampleModel;
