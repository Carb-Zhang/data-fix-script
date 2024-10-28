import { locateScope } from './locateScope.js';
import { prepareData } from './mockData.js';
import { checkCancelOrdersInZReading } from './checkCancelOrders.js';

export async function run() {
    // await prepareData();
    await locateScope();
    // await checkCancelOrdersInZReading();
}
