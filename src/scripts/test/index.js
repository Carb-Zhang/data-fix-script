import Stocktake from '../../models/stockTake.js';
import Product from '../../models/product.js';
import _ from 'lodash';

export async function run() {
    let totalQtyDiff = 0;
    let totalCostDiff = 0;
    const products = await Product.find({
        business: 'protechkitzone',
        'stockTakes.stockTakeId': '6704bb142a3f11000853f32b',
    }).select({ 'stockTakes.$': 1, cost: 1 });
    let firstPrint = true;

    products.forEach(function (product) {
        var quantityDiff =
            (product.stockTakes[0].countedQty || 0) - (product.stockTakes[0].quantity || 0);
        var costDiff = quantityDiff * (product.cost || 0);
        totalQtyDiff += quantityDiff;
        totalCostDiff += costDiff;
        if (_.isNaN(totalCostDiff) && firstPrint) {
            firstPrint = false;
            console.log(product);
        }
    });

    console.log(totalQtyDiff, totalCostDiff);
}
