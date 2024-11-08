const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchingTagSchema = new Schema(
    {
        tagName: {
            type: String,
            required: true,
        },

        tagType: {
            type: String,
            enum: ['food', 'cuisine', 'dietary'],
            required: true,
        },

        createdBy: {
            type: String,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: {
            createdAt: 'createdTime',
            updatedAt: 'updatedTime',
        },
    },
);

SearchingTagSchema.index({ tagName: 1 }, { unique: true });
SearchingTagSchema.index({ tagType: 1 });
module.exports = mongoose.model('SearchingTag', SearchingTagSchema);
