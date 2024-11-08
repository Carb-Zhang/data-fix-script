/**
 * Created with JetBrains WebStorm.
 * User: z
 * Date: 13-7-23
 * Time: PM2:55
 * To change this template use File | Settings | File Templates.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuickSelectCategorySchema = new Schema({
    categoryId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    order: {
        type: Number,
        required: true,
        default: 0,
    },
});

const QuickSelectLayoutSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        categories: {
            type: [QuickSelectCategorySchema],
        },
        appVersion: {
            type: Number,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

QuickSelectLayoutSchema.index(
    { business: 1, name: 1, 'categories.categoryId': 1 },
    { unique: true },
);

module.exports = mongoose.model('QuickSelectLayout', QuickSelectLayoutSchema);
