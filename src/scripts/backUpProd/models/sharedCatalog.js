const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SharedCatalogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        upc: {
            type: String,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

SharedCatalogSchema.index({ upc: 1 }, { unique: 1 });

module.exports = mongoose.model('SharedCatalog', SharedCatalogSchema);
