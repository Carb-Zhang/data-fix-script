import mongoose from 'mongoose';
import businessSchema from './models/business.js';
import shiftSchema from './models/shift.js';
import transactionRecordSchema from './models/transactionRecord.js';
import onlineTransactionSchema from './models/onlineTransaction.js';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

// const MONGODB_URL_SOURCE =
//     'mongodb+srv://fat:uZRvjZKkaIXzNXy4@testcluster.ibxvq.mongodb.net/server';
// const MONGODB_URL_TARGET = 'mongodb://127.0.0.1:27017/server';
const MONGODB_URL_SOURCE =
    'mongodb+srv://production-user:9iiRuToztDXPbk@v2021.gfskh.mongodb.net/server';
const MONGODB_URL_TARGET =
    'mongodb+srv://fat:uZRvjZKkaIXzNXy4@testcluster.ibxvq.mongodb.net/server';
let connSource = null;
let connTarget = null;

const CollectionType = {
    BUSINESS: 'BUSINESS',
    SHIFT: 'SHIFT',
    OFFLINEORDER: 'OFFLINEORDER',
    ONLINEORDER: 'ONLINEORDER',
};

const CollectionConfig = {
    [CollectionType.BUSINESS]: {
        name: 'Business',
        schema: businessSchema,
    },
    [CollectionType.SHIFT]: {
        name: 'Shift',
        schema: shiftSchema,
    },
    [CollectionType.OFFLINEORDER]: {
        name: 'TransactionRecord',
        schema: transactionRecordSchema,
    },
    [CollectionType.ONLINEORDER]: {
        name: 'OnlineTransaction',
        schema: onlineTransactionSchema,
    },
};

const businessName = 'lydiaslechonquezoncityinc';
const registerId = new ObjectId('64ed4ea120dd1900066ac318');
const storeId = new ObjectId('654c6395d390470007e97cf8');
const startTime = new Date('2024-08-01T12:00:00.000+08:00');
const filters = {
    [CollectionType.BUSINESS]: { name: businessName },
    [CollectionType.SHIFT]: { business: businessName, openTime: { $gt: startTime } },
    [CollectionType.OFFLINEORDER]: {
        business: businessName,
        registerId,
        createdTime: { $gt: startTime },
    },
    [CollectionType.ONLINEORDER]: {
        business: businessName,
        storeId,
        createdTime: { $gt: startTime },
    },
    // [CollectionType.BUSINESS]: {},
    // [CollectionType.SHIFT]: {},
    // [CollectionType.OFFLINEORDER]: {},
    // [CollectionType.ONLINEORDER]: {},
};

async function initConns() {
    connSource = await mongoose.createConnection(MONGODB_URL_SOURCE).asPromise();
    connTarget = await mongoose.createConnection(MONGODB_URL_TARGET).asPromise();
}

async function syncData(collectionType) {
    const config = CollectionConfig[collectionType];
    const sourceModel = connSource.model(config.name, config.schema);
    const targetModel = connTarget.model(config.name, config.schema);
    await sourceModel
        .find(filters[collectionType])
        .lean()
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(async (doc) => {
            try {
                await targetModel.insertMany([doc]);
            } catch (err) {
                if (err.code !== 11000) {
                    console.log(err);
                }
            }
        });
}

export async function run() {
    await initConns();

    for (const collectionType of Object.values(CollectionType)) {
        await syncData(collectionType);
    }
}
