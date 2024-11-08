const mongoose = require('mongoose'),
Schema = mongoose.Schema

const outletSchema = new Schema({
    outletId: {
        type: String,
    },
    storeId: {
        type: String,
    }
});

const grabfoodSettingsSchema = new Schema({
    business: {
        type: String,
        required: true
    },
    isEnabled: {
        type: Boolean,
    },
    isLived: {
        type: Boolean,
    },
    outlets: {
        type: [outletSchema]
    }
}, {
    timestamps: true
});

grabfoodSettingsSchema.index({business: 1});

module.exports = mongoose.model('GrabfoodSettings', grabfoodSettingsSchema);