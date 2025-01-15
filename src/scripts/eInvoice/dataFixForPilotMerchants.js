import Business from '../../models/business.js';
import _ from 'lodash';

const businessList = [
    'alex',
    'soyaben',
    'meatbun',
    'kafe123',
    'myuatstore',
    'nxdistrosdnbhd',
    'beepdeliveryops',
    'storehubescapelounge',
    'storehubmaraya',
    'hafizigadjet',
    'jupo',
    'iskl',
    'cmr',
    'bigappledonuts',
    'newborevamp',
    'javelynhee',
    'protoncafe',
    '7',
    'baleclub',
    'taylorsuniversity',
    'dexandrahq',
    'superkitchen',
    'damage',
    'perysmith',
    'moonshinebake',
    'khallegacytrading',
    'thebrasserie',
    'basilandbelacan',
    'kolumpokopitiam',
    // 'onlytestaccount', //test
];

const consolidatedBusinessList = [
    'iskl',
    'nxdistrosdnbhd',
    // 'onlytestaccount', //test
];

const isEInvoiceReady = (storeInfo) => {
    const eInvoiceFields = [
        'companyName',
        'street1',
        'city',
        'postalCode',
        'phone',
        'brn',
        'eInvoiceSetting.tin',
        'eInvoiceSetting.industry',
        'eInvoiceSetting.countryCode',
        'eInvoiceSetting.stateCode',
        'eInvoiceSetting.msicCode',
        'eInvoiceSetting.msicDescription',
    ];
    return eInvoiceFields.every((field) => !!_.get(storeInfo, field));
};

async function fix(doc) {
    doc.isEInvoiceEnabled = true;
    doc.stores.forEach((store) => {
        if (isEInvoiceReady(store)) {
            store.eInvoiceSetting.isEInvoiceReady = true;
            if (consolidatedBusinessList.includes(doc.name)) {
                store.eInvoiceSetting.isConsolidationOn = true;
            }
        }
    });
    await doc.save();
}

export async function dataFixForPilotMerchants(isRevert) {
    await Business.find({
        name: { $in: businessList },
    })
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(fix);
}
