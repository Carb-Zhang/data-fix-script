import Product from '../../models/product.js';
import StockTakeItem from '../../models/stockTakeItem.js';
import _ from 'lodash';
import InventoryChangeEvent from '../../models/inventoryChangeEvent.js';
import InventoryModel from '../../models/inventory.js';
import { sleep } from '../../utils/tools.js';

const firstStocktakeId = '6704bb142a3f11000853f32b';
const secondStocktakeId = '670f6ee5adc56e0007686881';
const storeId = '5e99435520e8461c64dff687';

async function compareStocktakes() {
    const firstItems = await StockTakeItem.find({ stockTakeId: firstStocktakeId }).lean();
    const secondItems = await StockTakeItem.find({ stockTakeId: secondStocktakeId }).lean();
    secondItems.forEach(({ productId, countedQty }) => {
        const itemToCompare = firstItems.find((item) => item.productId === productId);
        if (!itemToCompare || itemToCompare.countedQty !== countedQty) {
            console.log(productId);
        }
    });
}

async function fixInv(updates) {
    let count = 0;
    for (let i = 0; i < updates.length; i++) {
        try {
            count++;
            const { productId, updateAmount } = updates[i];
            await InventoryModel.updateOne(
                { storeId, productId },
                { $inc: { quantityOnHand: -updateAmount } },
            );
        } catch (err) {
            console.log(err, updates[i]);
        }
    }
    console.log('fix Inv count', count);
}

async function fixStocktakeItems() {
    const items = await StockTakeItem.find({ stockTakeId: secondStocktakeId }).lean();
    for (let i = 0; i < items.length; i++) {
        try {
            const { productId, stockTakeId, countedQty } = items[i];
            await StockTakeItem.updateOne(
                { productId, stockTakeId },
                { $set: { quantity: countedQty } },
            );
        } catch (err) {
            console.log(err, items[i]);
        }
    }
}

export async function fixStocktakeIssue() {
    const event = await InventoryChangeEvent.default
        .findOne({
            'sourceInfo.refId': secondStocktakeId,
        })
        .select({ updates: 1 })
        .lean();
    await fixInv(event.updates);
    await fixStocktakeItems();
}
