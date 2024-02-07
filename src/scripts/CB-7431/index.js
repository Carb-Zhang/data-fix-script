import TransactionRecord from '../../models/transactionRecord.js';
import { Types } from 'mongoose';

const business = 'outletsawarimenarafelda';
const registerId = new Types.ObjectId('654b2fee06a87f0006020a4a');
const oldProductId = '654b309ecc081a0007e78845';
const newProductId = '655ef1257b9bd000070a9283';
const receiptNumbers = [
    '0012312051115138',
    '0012312051209422',
    '0012312051212065',
    '0012312081008248',
    '0012312141004021',
    '0012312141339293',
    '0012312221107009',
    '0012312221426505',
];

// const business = 'onlytestaccount';
// const registerId = new Types.ObjectId('5f2b68b9da32e6000667c424');
// const oldProductId = '604747731684a40006ae188e';
// const newProductId = '656956dfc4675e00076acb98';

// const receiptNumbers = ['00000000153'];

async function fixOneOrder(order) {
    console.log(order.receiptNumber, order._id.toString());
    order.items.forEach((item) => {
        if (item.productId && item.productId.toString() === oldProductId) {
            console.log(item);
        }
    });
}

export async function run() {
    await TransactionRecord.find({
        business,
        registerId,
        receiptNumber: { $in: receiptNumbers },
    })
        .cursor()
        .eachAsync(fixOneOrder);
}
