import InventoryChangeEventCollection from '../../models/inventoryChangeEvent.js';
import InventoryCollection from '../../models/inventory.js';
import {
    InventoryChangeEventStatus,
    InventoryChangeEventType,
} from '../../models/inventoryChangeEvent.js';

import _ from 'lodash';

const oneDayInMS = 24 * 3600 * 1000;
const invCount = 1000;

async function getRecentChangedInvs() {
    const businesses = await InventoryChangeEventCollection.default.distinct('business', {
        createdAt: {
            $gt: new Date(Date.now() - oneDayInMS * 30),
            $lt: new Date(Date.now() - oneDayInMS * 29),
        },
        eventType: InventoryChangeEventType.ORDER_OFFLINE_PLACE,
    });
    const events = await InventoryChangeEventCollection.default
        .find({
            createdAt: {
                $gt: new Date(Date.now() - oneDayInMS),
            },
            status: InventoryChangeEventStatus.SUCCESS,
            business: { $in: businesses },
        })
        .select({ storeId: 1, 'updates.productId': 1, 'updates.storeId': 1 })
        .lean();
    const invs = [];
    events.forEach((event) => {
        event.updates.forEach(({ storeId, productId }) => {
            invs.push({
                storeId: storeId || event.storeId,
                productId: productId,
            });
        });
    });
    return invs.length > invCount ? invs.slice(0, invCount) : invs;
}

async function getInventoryChanges(params) {
    const { storeId, productId, startAt, endAt } = params;
    const setChanges = await InventoryChangeEventCollection.default.aggregate([
        {
            $match: {
                storeId: '',
                updates: {
                    $elemMatch: {
                        storeId,
                        productId,
                    },
                },
                status: 'SUCCESS',
                eventStartAt: {
                    $gte: startAt,
                    $lt: endAt,
                },
            },
        },
        {
            $project: {
                eventType: 1,
                updates: {
                    $filter: {
                        input: '$updates',
                        as: 'update',
                        cond: {
                            $and: [
                                { $eq: ['$$update.storeId', storeId] },
                                { $eq: ['$$update.productId', productId] },
                            ],
                        },
                    },
                },
            },
        },
        {
            $unwind: '$updates',
        },
        {
            $project: {
                eventType: 1,
                quantityBefore: '$updates.amountBefore',
                quantityAfter: '$updates.amountAfter',
                quantityDiff: '$updates.updateAmount',
                changedAt: '$updates.updatedAt',
            },
        },
    ]);
    const incChanges = await InventoryChangeEventCollection.default.aggregate([
        {
            $match: {
                storeId,
                'updates.productId': productId,
                status: 'SUCCESS',
                eventStartAt: {
                    $gte: startAt,
                    $lt: endAt,
                },
            },
        },
        {
            $project: {
                eventType: 1,
                updates: {
                    $filter: {
                        input: '$updates',
                        as: 'update',
                        cond: {
                            $and: [{ $eq: ['$$update.productId', productId] }],
                        },
                    },
                },
            },
        },
        {
            $unwind: '$updates',
        },
        {
            $project: {
                eventType: 1,
                quantityBefore: '$updates.amountBefore',
                quantityAfter: '$updates.amountAfter',
                quantityDiff: '$updates.updateAmount',
                changedAt: '$updates.updatedAt',
            },
        },
    ]);
    return _.reverse(_.sortBy([...setChanges, ...incChanges], ['changedAt'])).map(
        (record) =>
            new Object({
                ...record,
                quantityBefore: _.round(record.quantityBefore, 2),
                quantityAfter: _.round(record.quantityAfter, 2),
                quantityDiff: _.round(record.quantityDiff, 2),
            }),
    );
}

function isEqual(v1, v2) {
    return Math.abs(v1 - v2) < 0.1;
}

function checking(storeId, productId, auditTrails, currentQty) {
    let i = 0;
    let currentRecord = auditTrails[i];
    if (!isEqual(currentRecord.quantityAfter, currentQty)) {
        console.log(
            'currentQty not consistent',
            storeId,
            productId,
            currentRecord.quantityAfter,
            currentQty,
        );
    }
    let lastRecord = null;

    while (++i < auditTrails.length) {
        lastRecord = auditTrails[i];
        if (!isEqual(currentRecord.quantityBefore, lastRecord.quantityAfter)) {
            console.log(
                storeId,
                productId,
                `audit trail not consistent ${JSON.stringify(currentRecord)} ${JSON.stringify(
                    lastRecord,
                )}`,
            );
            break;
        }
        currentRecord = lastRecord;
    }
}

async function verifyInv(inv) {
    const { storeId, productId } = inv;

    const res = await InventoryCollection.find(inv);
    if (!res[0]) {
        return;
    }
    const auditTrails = await getInventoryChanges({
        storeId,
        productId,
        startAt: new Date(Date.now() - oneDayInMS * 10),
        endAt: new Date(Date.now() + oneDayInMS),
    });
    checking(storeId, productId, auditTrails, res[0].quantityOnHand);
}

// export async function run() {
// const invs = await getRecentChangedInvs();
// console.log(`Get ${invs.length} waiting verify invs`);
// let i = -1;
// while (++i < invs.length) {
//     await verifyInv(invs[i]);
// }
// }

export async function run() {
    const oneMinutes = 60 * 1000;
    const time = new Date('2024-04-01T13:44:18.086Z');
    const storeId = '659e5e6ba78a5a00075b6071';
    const productId = '65b30d459c3baf0007bc06f0';
    const auditTrails = await getInventoryChanges({
        storeId,
        productId,
        startAt: new Date(time.getTime() - oneMinutes * 60),
        endAt: new Date(time.getTime() + oneMinutes * 60),
    });
    console.log(auditTrails);
}
