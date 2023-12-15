import InventoryChangeEventModel from '../../models/inventoryChangeEvent.js';
import InventoryModel from '../../models/inventory.js';
import _ from 'lodash';

let count = 0;

async function updateInvs(event) {
    let filter = {};
    if (event.storeId) {
        filter = {
            storeId: event.storeId,
            productId: { $in: event.updates.map(({ productId }) => productId) },
        };
    } else {
        filter = {
            $or: event.updates.map((update) => _.pick(update, ['productId', 'storeId'])),
        };
    }
    await InventoryModel.updateMany(filter, { $pull: { appliedEventIds: event.eventId } });
}

async function _clearEventIds(event) {
    await updateInvs(event);
    event.isEventIdsCleared = true;
    await event.save();
    count++;
}

async function clearEventIds(event) {
    try {
        await _clearEventIds(event);
    } catch (err) {
        console.log('Error for', event.eventId, err.message);
    }
}

export async function run() {
    await InventoryChangeEventModel.default
        .find({
            isEventIdsCleared: false,
            status: 'SUCCESS',
        })
        .cursor({})
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(clearEventIds, { continueOnError: true });
    console.log('Fixed data count', count);
}
