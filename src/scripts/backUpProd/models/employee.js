/**
 * Created with JetBrains WebStorm.
 * User: mac
 * Date: 13-3-25
 * Time: 下午3:36
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const PasswordSettingTokenSchema = require('./passwordSettingToken.js');
const DeviceSchema = require('./device');

const EmployeeSchema = new Schema(
    {
        employerName: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        employeeNumber: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
        },
        phone: {
            type: String,
        },
        managerAccess: {
            type: Boolean,
            default: false,
        },
        cashierAccess: {
            type: Boolean,
            default: false,
        },
        backOfficeAccess: {
            type: Boolean,
            default: false,
        },
        limitBackOfficeAccess: {
            type: Boolean,
            default: false,
        },
        backOfficeDetailAccesses: {
            type: [String],
        },
        accessAllStores: {
            type: Boolean,
            default: false,
        },
        assignedStores: {
            type: [String],
        },
        passwordSettingTokens: {
            type: [PasswordSettingTokenSchema],
        },
        modifiedTime: {
            type: Date,
            required: true,
        },
        createdTime: {
            type: Date,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        lastCheckAlerts: {
            type: Date,
        },
        //{ event_type: array of store ObjectId string  }, e.g. { stock_low: [ storeId1, storeId2] }
        emailNotifications: {
            type: Mixed,
        },
        languagePreference: {
            type: String,
        },
        isTutorialDone: {
            type: Boolean,
        },
        devices: {
            type: [DeviceSchema],
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

EmployeeSchema.index({ employerName: 1, employeeNumber: 1 }, { unique: true });
EmployeeSchema.index({ employerName: 1, email: 1 });
EmployeeSchema.index({ 'passwordSettingTokens.token': 1 }, { unique: true, sparse: true });
EmployeeSchema.index({ employerName: 1, 'shifts.clockInTime': 1 });

module.exports = mongoose.model('Employee', EmployeeSchema);
