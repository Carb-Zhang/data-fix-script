import { locateScope } from './locateScope.js';
import { prepareData } from './mockData.js';
import { checkCancelOrdersInZReading } from './checkCancelOrders.js';
import { backUp } from './backUp.js';
import { fixOrders } from './fixOrders.js';
import { checkZReadingWithStartTrxNoWrong } from './checkZReadingWithStartTrxNoWrong.js';
import { fixZReadingWithStartTrxNoWrong } from './fixZReadingWithStartTrxNoWrong.js';
import { checkAllZReadingWithStartTrxNoWrong } from './checkAllZReadingWithStartTrxNoWrong.js';
import { test } from './test.js';

export async function run() {
    await test();
}
