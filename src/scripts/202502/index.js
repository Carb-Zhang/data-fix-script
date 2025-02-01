import EInvoiceConsolidationTask from '../../models/eInvoiceConsolidationTask.js';
import Business from '../../models/business.js';
import _ from 'lodash';

export async function run() {
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
    merchants.forEach((m) => {
        m.stores.forEach((s) => {
            if (
                !s.isDeleted &&
                _.get(s, 'eInvoiceSetting.isEInvoiceReady') &&
                _.get(s, 'eInvoiceSetting.isConsolidationOn') &&
                ['LUXURY', 'OTHERS'].includes(_.get(s, 'eInvoiceSetting.industry'))
            ) {
                storeIds.push(s._id.toString());
            }
        });
    });
    console.log(storeIds);
    console.log('count', storeIds.length);
}
