import { ordersBefore0917 } from './records/ordersBefore0917.js';
import { parseCsv } from '../../utils/index.js';
import _ from 'lodash';

export async function test() {
    const orders = await parseCsv(
        'src/scripts/PS-5918/records/ordersAffectZReading20241024.csv',
        true,
    );

    const orderIds = orders.map(({ transactionId }) => transactionId);
    const orderIds2 = ordersBefore0917.map(({ transactionid }) => transactionid);
    console.log(_.intersection(orderIds, orderIds2));
}

test().then(console.log);
