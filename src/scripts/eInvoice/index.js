// import { resetOrdersEInvoiceInfo } from './resetOrdersEInvoiceInfo.js';
import { updateConsolidateTask } from './updateConsolidateTask.js';
import { DateTime } from 'luxon';

export async function run() {
    // await prepareData();
    // await resetOrdersEInvoiceInfo();
    // const time1 = DateTime.now().setZone('UTC+8').startOf('month').minus({ months: 1 }).toJSDate();
    // const time2 = DateTime.now().startOf('month').minus({ months: 1 }).toJSDate();
    // console.log(time1, time2);

    await updateConsolidateTask();
}
