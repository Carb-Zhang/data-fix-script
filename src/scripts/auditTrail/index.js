import { checkEvent } from './checkFailEvents.js';
import { checkOrdersWithFailMessage } from './checkLostMessages.js';
import { revertDupStocktake } from './revertDupStocktake.js';
import { test } from './test.js';
import { fixProductCost } from './fixProductCost.js';
import { fixStocktakeIssue } from './fixStocktakeIssue.js';

// const BUSINESS = 'paporma';
const START_TIME = new Date('2024-08-16T14:25:23.940+08:00');
const END_TIME = new Date('2024-08-16T14:55:23.940+08:00');

export async function run() {
    // await checkOrdersWithFailMessage('', START_TIME, END_TIME);
    // await checkEvent('', START_TIME);
    // await checkEvent('', START_TIME);
    await fixStocktakeIssue();
    // await test();
}
