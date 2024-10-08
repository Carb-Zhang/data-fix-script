import { fixReceiptNumbers } from './fixReceiptNumbers.js';
import { prepareData } from './mockData.js';

export async function run() {
    // await prepareData();
    await fixReceiptNumbers();
}
