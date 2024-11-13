import Employee from '../../models/employee.js';

function updateAccess(doc) {
    let needUpdate = false;
    if (doc.backOfficeDetailAccesses.includes('loyalty/reports')) {
        if (!doc.backOfficeDetailAccesses.includes('membership/insights')) {
            doc.backOfficeDetailAccesses.push('membership/insights');
            needUpdate = true;
        }
    }
    if (doc.backOfficeDetailAccesses.includes('loyalty/cashback')) {
        ['membership/settings', 'membership/points', 'membership/cashback'].forEach((access) => {
            if (!doc.backOfficeDetailAccesses.includes(access)) {
                doc.backOfficeDetailAccesses.push(access);
                needUpdate = true;
            }
        });
    }
    return needUpdate;
}

export async function run() {
    await Employee.find({
        backOfficeDetailAccesses: { $in: ['loyalty/cashback', 'loyalty/reports'] },
    })
        .cursor()
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(async (doc) => {
            if (doc.backOfficeDetailAccesses) {
                const needUpdate = updateAccess(doc);
                if (needUpdate) {
                    await doc.save();
                }
            }
        });
}
