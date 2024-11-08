/**
 * Created by z on 4/15/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const NotificaitonSchema = new Schema(
    {
        employeeId: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        //Possible values are:
        // 1) stock_low
        eventType: {
            type: String,
            required: true,
        },
        //Payload of each type :
        //stock_low : nil
        payload: {
            type: Mixed,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

NotificaitonSchema.index({ employeeId: 1, time: -1 });
NotificaitonSchema.index({ time: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('notification', NotificaitonSchema);
