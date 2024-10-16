import InventoryChangeEvent from '../../models/inventoryChangeEvent.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';
import _ from 'lodash';

const stocktakeId = '6704bb142a3f11000853f32b';
const business = 'protechkitzone';
const storeId = '5e99435520e8461c64dff687';

function checkEqual(events) {
    const firstUpdates = events[0].updates;

    for (let i = 1; i < events.length; i++) {
        const updatesToCompare = events[i].updates;
        if (updatesToCompare.length !== firstUpdates.length) {
            console.log('********not equal', i);
            break;
        }
        for (let j = 0; j < firstUpdates.length; j++) {
            if (
                !_.isEqual(
                    _.pick(firstUpdates[j], ['productId', 'updateAmount']),
                    _.pick(updatesToCompare[j], ['productId', 'updateAmount']),
                )
            ) {
                console.log(
                    '*********not equal',
                    _.pick(firstUpdates[j], ['productId', 'updateAmount']),
                    _.pick(updatesToCompare[j], ['productId', 'updateAmount']),
                );
                break;
            }
        }
    }
}

export async function revertDupStocktake() {
    const filter = {
        'sourceInfo.refId': '6704bb142a3f11000853f32b',
    };

    const events = await InventoryChangeEvent.default
        .find(filter)
        .sort({ createdAt: 1 })
        .select({ updates: 1 })
        .lean();

    checkEqual(events);
}
