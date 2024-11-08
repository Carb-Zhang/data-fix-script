const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const grabItemMappingsSchema = new Schema({
    sectionId: {
        type: String,
        required: true,
    },
    grabItemId: {
        type: String,
        required: true,
    },
    storehubItemId: {
        type: String,
        required: true,
    },
});

const grabModifierMappingsSchema = new Schema({
    sectionId: {
        type: String,
        required: true,
    },
    grabModifierId: {
        type: String,
        required: true,
    },
    storehubModifierId: {
        type: String,
        required: true,
    },
});

const OutletSchema = new Schema({
    outletId: {
        type: String,
        required: true,
    },
    storeId: {
        type: String,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        required: true,
        default: false,
    },
    isRequested: {
        type: Boolean,
        default: false,
    },
    hadEnabled: {
        type: Boolean,
        default: false,
    },
    isLived: {
        type: Boolean,
        default: false,
    },
    taxCode: {
        type: String,
    },
    isSyncTaxExclusivePrice: Boolean,
    sectionIds: {
        type: [String],
    },
    grabItemMappings: {
        type: [grabItemMappingsSchema],
    },
    grabModifierMappings: {
        type: [grabModifierMappingsSchema],
    },
    grabPortalOrderPollStartAt: String,
    grabPortalOrderPollEndAt: String,
    addOnAccount: {
        type: String,
    },
    addOnPwd: {
        type: String,
    },
});

const FoodDeliveryPlatformSchema = new Schema({
    business: {
        type: String,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        required: true,
    },
    outlets: {
        type: [OutletSchema],
    },
    platform: {
        type: Number,
    },
    hadEnabled: {
        type: Boolean,
        default: false,
    },
    addOnVersion: {
        type: String,
        default: 'v2',
    },
});

FoodDeliveryPlatformSchema.index(
    { business: 1, platform: 1, 'outlets.storeId': 1 },
    { unique: true },
);

module.exports = mongoose.model('FoodDeliveryPlatformSettings', FoodDeliveryPlatformSchema);