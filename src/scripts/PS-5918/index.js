import { locateScope } from './locateScope.js';
import { prepareData } from './mockData.js';
import { checkCancelOrdersInZReading } from './checkCancelOrders.js';
import { backUp } from './backUp.js';
import { fixOrders } from './fixOrders.js';
import { checkZReadingWithStartTrxNoWrong } from './checkZReadingWithStartTrxNoWrong.js';

export async function run() {
    // await prepareData();
    // await locateScope();
    await checkZReadingWithStartTrxNoWrong();
}
