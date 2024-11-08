const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlockAccountSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        blockOnlineStore: {
            type: Boolean,
        },
        blockPayout: {
            type: Boolean,
        },
        reason: {
            type: String,
            required: true,
        },
        remark: {
            type: String,
        },
        refId: {
            type: String,
        },
        refType: {
            type: String,
        }
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    },
)

BlockAccountSchema.index({ business: 1, blockPayout: 1, blockOnlineStore: 1 })
BlockAccountSchema.index({ business: 1 }, { unique: true })

module.exports = mongoose.model('BlockAccount', BlockAccountSchema)
