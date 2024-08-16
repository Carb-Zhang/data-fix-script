import TransactionRecord from '../../models/transactionRecord.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;
import InventoryChangeEvent, {
    InventoryChangeEventType,
} from '../../models/inventoryChangeEvent.js';

async function getEventIds() {
    const startTime = new Date('2024-08-16T14:00:23.940+08:00');
    const endTime = new Date('2024-08-16T15:00:23.940+08:00');
    const filter = {
        'inventoryChangeMsgTrackInfo.isSendMsg': false,
        _id: {
            $gte: ObjectId.createFromTime(Math.floor(startTime.getTime() / 1000)),
            $lte: ObjectId.createFromTime(Math.floor(endTime.getTime() / 1000)),
        },
    };

    const orders = await TransactionRecord.find(filter)
        .select({ inventoryChangeMsgTrackInfo: 1 })
        .lean();
    return orders.map(
        ({ inventoryChangeMsgTrackInfo }) => inventoryChangeMsgTrackInfo.eventId || '',
    );
}

async function checkProduct(productId, storeId) {
    // const startAt = ISODate('2024-06-01T00:30:27.014+08:00');
    // const endAt = ISODate('2024-08-20T00:30:27.014+08:00');
    const startAt = new Date('2024-08-16T14:00:23.940+08:00');
    const endAt = new Date('2024-08-16T19:30:23.940+08:00');

    const event = await InventoryChangeEvent.default.findOne({
        createdAt: { $gt: startAt, $lt: endAt },
        'updates.productId': productId,
        $or: [
            { storeId },
            {
                updates: {
                    $elemMatch: {
                        storeId,
                        productId,
                    },
                },
            },
        ],
        updateType: {
            $in: [
                InventoryChangeEventType.MANUAL_EDIT_INVENTORY,
                InventoryChangeEventType.PRODUCTS_IMPORT,
            ],
        },
    });
    if (event) {
        console.log(productId, storeId);
    }
}

function combineProducts(event) {
    return event.updates.map(({ productId, storeId }) => ({
        productId,
        storeId: storeId || event.storeId,
    }));
}

export async function test() {
    const eventIds = await getEventIds();
    for (let i = 0; i < eventIds.length; i++) {
        const event = await InventoryChangeEvent.default.findOne({ eventId: eventIds[i] }).lean();
        if (!event) {
            continue;
        }

        const products = combineProducts(event);

        for (let j = 0; j < products.length; j++) {
            await checkProduct(products[j].productId, products[j].storeId);
        }
    }
}
