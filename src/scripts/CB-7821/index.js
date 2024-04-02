import InventoryChangeEventCollection from '../../models/inventoryChangeEvent.js';
import InventoryCollection from '../../models/inventory.js';
import {
    InventoryChangeEventStatus,
    InventoryChangeEventType,
} from '../../models/inventoryChangeEvent.js';

import _ from 'lodash';

const oneDayInMS = 24 * 3600 * 1000;

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
    return invs.length > 50 ? invs.slice(0, 100) : invs;
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
    return _.reverse(_.sortBy([...setChanges, ...incChanges], ['changedAt']));
}

function checking(auditTrails, currentQty) {
    let i = 0;
    let currentRecord = auditTrails[i];
    if (currentRecord.quantityAfter !== currentQty) {
        return [true, false];
    }
    let lastRecord = null;

    while (++i < auditTrails.length) {
        lastRecord = auditTrails[i];
        if (currentRecord.quantityBefore !== lastRecord.quantityAfter) {
            console.log(`not consistent record ${JSON.stringify(currentRecord)}`);
            return [false, true];
        }
        currentRecord = lastRecord;
    }
    return [false, false];
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
        startAt: new Date(Date.now() - oneDayInMS * 30),
        endAt: new Date(Date.now() + oneDayInMS),
    });
    const [isQtyOnHandNotConsistent, isAuditTrailNotConsistent] = checking(
        auditTrails,
        res[0].quantityOnHand,
    );
    if (isQtyOnHandNotConsistent) {
        console.log(`${JSON.stringify({ storeId, productId })}, currentQty not consistent`);
    }
    if (isAuditTrailNotConsistent) {
        console.log(`${JSON.stringify({ storeId, productId })}, audit trail not consistent`);
        console.log(`${JSON.stringify(auditTrails)}`);
    }
}

export async function run() {
    const invs = await getRecentChangedInvs();
    console.log(`Get ${invs.length} waiting verify invs`);
    let i = -1;
    while (++i < invs.length) {
        await verifyInv(invs[i]);
    }
}
