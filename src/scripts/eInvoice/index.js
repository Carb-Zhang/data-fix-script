// import { resetOrdersEInvoiceInfo } from './resetOrdersEInvoiceInfo.js';
import { finishDataFix } from './updateConsolidateTask.js';
import { mockConsolidateOrderForTest } from './mockConsolidateOrderForTest.js';
import { dataFixForPilotMerchants } from './dataFixForPilotMerchants.js';
import { DateTime } from 'luxon';

export async function run() {
    // await prepareData();
    // await resetOrdersEInvoiceInfo();
    // const time1 = DateTime.now().setZone('UTC+8').startOf('month').minus({ months: 1 }).toJSDate();
    // const time2 = DateTime.now().startOf('month').minus({ months: 1 }).toJSDate();
    // console.log(time1, time2);

    // await finishDataFix();
    // await mockConsolidateOrderForTest(true);
    await dataFixForPilotMerchants();
}
