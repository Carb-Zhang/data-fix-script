import Customer from '../../models/customer.js';
import _ from 'lodash';

export async function fix(doc) {
    const invalidValues = ['N/A', '.'];
    let needFix = false;
    if (invalidValues.includes(_.get(doc, 'firstName', '').trim())) {
        needFix = true;
        doc.firstName = '';
    }
    if (invalidValues.includes(_.get(doc, 'lastName', '').trim())) {
        needFix = true;
        doc.lastName = '';
    }
    if (needFix) {
        await doc.save();
    }
}

export async function run() {
    await Customer.find({
        // business: 'starwise',
        business: 'kafe123',
    })
        .sort({ _id: 1 })
        .select({ firstName: 1, lastName: 1 })
        .cursor({})
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(fix, { continueOnError: true });
}
