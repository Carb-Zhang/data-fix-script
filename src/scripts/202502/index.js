import EInvoiceConsolidationTask from '../../models/eInvoiceConsolidationTask.js';
import Business from '../../models/business.js';
import _ from 'lodash';

async function test() {
    const merchants = await Business.find({
        isEInvoiceEnabled: true,
    })
        .select({
            name: 1,
            'stores._id': 1,
            'stores.isDeleted': 1,
            'stores.eInvoiceSetting.isEInvoiceReady': 1,
            'stores.eInvoiceSetting.isConsolidationOn': 1,
            'stores.eInvoiceSetting.industry': 1,
        })
        .lean();
    const storeIds = [];
    const businessNames = [];
    merchants.forEach((m) => {
        m.stores.forEach((s) => {
            if (
                !s.isDeleted &&
                _.get(s, 'eInvoiceSetting.isEInvoiceReady') &&
                _.get(s, 'eInvoiceSetting.isConsolidationOn') &&
                ['LUXURY', 'OTHERS'].includes(_.get(s, 'eInvoiceSetting.industry'))
            ) {
                storeIds.push(s._id.toString());
                if (!businessNames.includes(m.name)) {
                    businessNames.push(m.name);
                }
            }
        });
    });
    // console.log(storeIds);
    console.log('count', storeIds.length);
    const taskStoreIds = await EInvoiceConsolidationTask.default.distinct('storeId', {
        month: '2025-02',
    });
    console.log(_.difference(storeIds, taskStoreIds));
    console.log(businessNames);
}

export async function run() {
    // const tasks = await EInvoiceConsolidationTask.default.find({
    //     month: '2025-02',
    //     status: 'IN_PROCESS',
    // });
    // console.log(tasks);
    await test();
}
