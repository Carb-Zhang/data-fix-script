import Product from '../../models/product.js';
import _ from 'lodash';

let count = 0;

async function fixCost(doc) {
    doc.cost = _.isFinite(doc.lastSupplierPrice) ? doc.lastSupplierPrice : 0;
    await doc.save();
    count++;
}

export async function fixProductCost() {
    await Product.find({
        cost: Infinity,
    })
        .sort({ _id: -1 })
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(fixCost, { continueOnError: true });
    console.log('fix count:', count);
}
