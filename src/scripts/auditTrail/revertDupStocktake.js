import InventoryChangeEvent from '../../models/inventoryChangeEvent.js';
import InventoryModel from '../../models/inventory.js';
import { createWriteStream } from 'fs';
import { sleep } from '../../utils/tools.js';
import _ from 'lodash';

const writeEventStream = createWriteStream('removed_event.json');

function writeOneEventDoc(str) {
    return new Promise((res, rej) => {
        writeEventStream.write(str, (err) => {
            if (err) {
                console.log('err', err);
                rej(err);
            } else {
                res();
            }
        });
    });
}

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
            }
        }
    }
}

export async function fix(updates, times) {
    for (let i = 0; i < updates.length; i++) {
        try {
            const { productId, updateAmount } = updates[i];
            await InventoryModel.updateOne(
                { storeId, productId },
                { $inc: { quantityOnHand: -(updateAmount * times) } },
            );
        } catch (err) {
            console.log(err, updates[i]);
        }
    }
}

export async function backup(events) {
    let isFirst = true;

    for (let i = 1; i < events.length; i++) {
        await InventoryChangeEvent.default.deleteOne({ _id: events[i]._id });

        var prefix = isFirst ? '[' : ',';
        if (isFirst) {
            isFirst = false;
        }
        let docToReturn = prefix + JSON.stringify(events[i]);
        await writeOneEventDoc(docToReturn);
    }
    await writeOneEventDoc(']');
}

async function fixInv() {
    await InventoryModel.updateOne(
        { storeId, productId: '6336e203c7474a0007329e9b' },
        { $inc: { quantityOnHand: -4 } },
    );
}

export async function revertDupStocktake() {
    // const filter = {
    //     'sourceInfo.refId': '6704bb142a3f11000853f32b',
    // };

    // const events = await InventoryChangeEvent.default
    //     .find(filter)
    //     .sort({ createdAt: 1 })
    //     .select({ updates: 1 })
    //     .lean();

    // checkEqual(events);
    // const firstEvent = events[0];
    // await fix(firstEvent.updates, events.length - 1);
    // await backup(events);
    await fixInv()
}
