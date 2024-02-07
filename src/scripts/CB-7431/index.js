import TransactionRecord from '../../models/transactionRecord.js';
import { Types } from 'mongoose';

const business = 'outletsawarimenarafelda';
const registerId = new Types.ObjectId('654b2fee06a87f0006020a4a');
const oldProductId = new Types.ObjectId('654b309ecc081a0007e78845');
const newProductId = new Types.ObjectId('655ef1257b9bd000070a9283');

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

async function fixOneOrder(order) {
    order.items.forEach((item) => {
        if (item.productId === oldProductId) {
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
