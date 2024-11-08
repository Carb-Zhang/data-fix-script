const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    sectionId: {
        type: String,
        required: true,
    },
    sectionName: {
        type: String,
    },
    order: {
        type: Number,
        required: true,
        default: 0,
    },
});

const TableLayoutSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        storeId: {
            type: String,
            required: true,
        },
        sections: {
            type: [SectionSchema],
        },
        appVersion: {
            type: Number,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

TableLayoutSchema.index({ business: 1, storeId: 1, 'sections.sectionId': 1 }, { unique: true });

module.exports = mongoose.model('TableLayout', TableLayoutSchema);
