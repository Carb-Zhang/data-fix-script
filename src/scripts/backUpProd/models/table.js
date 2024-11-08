const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FrameSchema = new Schema({
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    xCoordinate: {
        type: Number,
    },
    yCoordinate: {
        type: Number,
    },
    shape: {
        type: String,
        enum: ['rectangle', 'ellipse'],
    },
    rotate: Number,
});

const TableSchema = new Schema(
    {
        business: {
            type: String,
            required: true,
        },
        storeId: {
            type: String,
            required: true,
        },
        sectionId: {
            type: String,
        },
        tableName: {
            type: String,
        },
        seatingCapacity: {
            type: Number,
        },
        frame: {
            type: FrameSchema,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

TableSchema.index({ business: 1, storeId: 1, sectionId: 1 });

module.exports = mongoose.model('Table', TableSchema);
