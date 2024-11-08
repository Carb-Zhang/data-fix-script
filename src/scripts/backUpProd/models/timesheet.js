/**
 * Created with JetBrains WebStorm.
 * User: z
 * Date: 12/15/13
 * Time: 5:57 PM
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EmployeeShiftSchema = new Schema(
    {
        employeeId: {
            type: ObjectId,
            required: true,
        },
        storeId: {
            type: String,
        },
        clockInTime: {
            type: Date,
            required: true,
        },
        clockOutTime: {
            type: Date,
        },
        clockInImage: {
            type: String,
        },
        clockOutImage: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

EmployeeShiftSchema.index({ employeeId: 1, clockInTime: 1 });

module.exports = mongoose.model('TimeSheet', EmployeeShiftSchema);
