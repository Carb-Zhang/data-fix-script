import TransactionRecord from '../../models/transactionRecord.js';
import { parseCsv } from '../../utils/index.js';

export async function checkCancelOrdersInZReading() {
    const orders = await parseCsv(
        'src/scripts/PS-5918/records/ordersAffectZReading20241024.csv',
        true,
    );

    for (let i = 0; i < orders.length; i++) {
        const { business, receiptNumber } = orders[i];
        const order = await TransactionRecord.findOne({
            business,
            receiptNumber,
            isCancelled: true,
        })
            .select({
                business: 1,
                receiptNumber: 1,
            })
            .lean();
        if (order) {
            console.log(order);
        }
    }
}

//   {
//     _id: new ObjectId("66f968451ced9400062ad344"),
//     receiptNumber: '00000005784',
//     business: 'sagecafe'
//   }
//   {
//     _id: new ObjectId("66fa5af3735b590007240f8c"),
//     receiptNumber: '00000040294',
//     business: 'youandme'
//   }
//   {
//     _id: new ObjectId("66fa5aef28ad0300070a2ae1"),
//     receiptNumber: '00000040295',
//     business: 'youandme'
//   }
