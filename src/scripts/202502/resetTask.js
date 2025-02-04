import EInvoiceConsolidationTask from '../../models/eInvoiceConsolidationTask.js';
import Business from '../../models/business.js';
import _ from 'lodash';

export async function run() {
    const tasksToReset = EInvoiceConsolidationTask.find({
        month: '2025-02',
        status: 'IN_PROCESS',
    }).lean();
    
}
