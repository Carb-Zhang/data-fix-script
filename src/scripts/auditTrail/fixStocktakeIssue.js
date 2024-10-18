import Product from '../../models/product.js';
import StockTakeItem from '../../models/stockTakeItem.js';
import _ from 'lodash';

const firstStocktakeId = '6704bb142a3f11000853f32b';
const secondStocktakeId = '670f6ee5adc56e0007686881';

export async function compareStocktakes() {
    const firstItems = await StockTakeItem.find({ stockTakeId: firstStocktakeId }).lean();
    const secondItems = await StockTakeItem.find({ stockTakeId: secondStocktakeId }).lean();
    secondItems.forEach(({ productId, countedQty }) => {
        const itemToCompare = firstItems.find((item) => item.productId === productId);
        if (!itemToCompare || itemToCompare.countedQty !== countedQty) {
            console.log(productId);
        }
    });
}

export async function fixStocktakeIssue() {
    await compareStocktakes();
}
