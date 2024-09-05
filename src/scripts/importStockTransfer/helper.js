import { Types } from 'mongoose';
import kue from 'kue';
const ObjectId = Types.ObjectId;
import Product from '../../models/product.js';
import SerialNumber from '../../models/serialNumber.js';

function getProductByIdOrSKU(businessName, identifier, callback) {
    var query;
    if (ObjectId.isValid(identifier)) {
        query = {
            $or: [
                { _id: new ObjectId(identifier) },
                { business: businessName, skuNumber: identifier },
            ],
        };
    } else {
        query = { skuNumber: identifier };
    }

    Product.find(query)
        .where('isDeleted')
        .ne(true)
        .exec()
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => callback(err));
}

export const productHelper = {
    getProductByIdOrSKU,
};

export const serialNumberHelper = {
    getSerialNumbersByFilter: async (businessName, filter) => {
        const { storeId, productSerialNums } = filter;
        
        const queryFilter = {};
        if (storeId) {
          Object.assign(queryFilter, { storeId })
        }
        if (productSerialNums) {
          Object.assign(queryFilter, { $or: productSerialNums })
        }
        return await SerialNumber.find({
          storeId,
          $or: productSerialNums,
        })
          .select({ productId: 1, serialNum: 1 })
          .lean()
      },
};

export const awsS3Helper = {
    downloadFile: function (filePath, callback) {
        callback();
    },
    uploadFile: function (filePath, resultFilePath, callback) {
        callback();
    },
};

export const stockTransferHelper = {
    StockTransferStatus: {
        CREATED: 'created',
        SHIPPED: 'shipped',
        COMPLETED: 'completed',
        CANCELLED: 'cancelled',
      }
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
