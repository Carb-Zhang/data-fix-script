import { Types } from 'mongoose';
import kue from 'kue';
const ObjectId = Types.ObjectId;
import Product from '../../models/product.js';

function getProductByIdOrSKU(businessName, identifier, callback) {
    var BusinessProducts = Product;
    var query;
    if (ObjectId.isValid(identifier)) {
        query = {
            $or: [{ _id: ObjectId(identifier) }, { business: businessName, skuNumber: identifier }],
        };
    } else {
        query = { skuNumber: identifier };
    }

    BusinessProducts.find(query)
        .where('isDeleted')
        .ne(true)
        .exec()
        .then((res) => callback(null, res))
        .catch((err) => callback(err));
}

export const productHelper = {
    getProductByIdOrSKU,
};

export const awsS3Helper = {
    downloadFile: function (filePath, callback) {
        callback();
    },
    uploadFile: function (filePath, resultFilePath, callback) {
        callback();
    },
};
export const kueHelper = {
    createQueue: function () {
        var kueOptions = {
            redis: {
                host: process.env.REDISHOST,
            },
            prefix: 'kue__',
        };
        return kue.createQueue(kueOptions);
    },
};

export const i18n = {
    __: ({ phrase }) => phrase,
};
