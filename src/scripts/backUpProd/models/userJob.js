/**
 * Created by z on 5/9/15.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserJobSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        employeeId: {
            type: String,
        },
        //Possible values are :
        //1) import_product
        jobType: {
            type: String,
            required: true,
        },
        //Possible values are :
        //1) queued
        //2) processing
        //3) failed
        //4) completed
        status: {
            type: String,
        },
        uploadedFile: {
            type: String,
        },
        resultsFile: {
            type: String,
        },
        //progress is in percentage, from 0 to 100
        progress: {
            type: Number,
        },
        error: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

UserJobSchema.index({ business: 1, jobType: 1, time: -1 });
UserJobSchema.index({ time: 1 }, { expireAfterSeconds: 604800 });

module.exports = mongoose.model('UserJob', UserJobSchema);
