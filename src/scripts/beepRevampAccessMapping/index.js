import EmployeeModel from '../../models/employee.js';
import _ from 'lodash';

const AccessMap = {
    'onlinestore/setup': ['onlinestore/webstore'],
    'onlinestore/appearance': ['onlinestore/webstore'],
    'onlinestore/beepprofile': ['onlinestore/beepqr', 'onlinestore/beepdelivery'],
    reports: ['stocks/stockvalue', 'loyalty/reports', 'employees/sales'],
};

let count = 0;

async function _fixEmployeeAccesses(employee) {
    if (!_.isArray(employee.backOfficeDetailAccesses)) {
        return;
    }
    let newAccess = [];
    for (const oldAccess of Object.keys(AccessMap)) {
        if (employee.backOfficeDetailAccesses.includes(oldAccess)) {
            newAccess.push(...AccessMap[oldAccess]);
        }
    }
    const accessToAdd = _.uniq(newAccess).filter(
        (access) => !employee.backOfficeDetailAccesses.includes(access),
    );
    if (accessToAdd.length === 0) {
        return;
    }
    employee.backOfficeDetailAccesses.push(...accessToAdd);
    await employee.save();
    count++;
}

async function fixEmployeeAccesses(employee) {
    try {
        await _fixEmployeeAccesses(employee);
    } catch (err) {
        console.log('Error for', employee._id.toString(), err.message);
    }
}

export async function run() {
    const filter = { isDeleted: { $ne: true } };
    await EmployeeModel.find(filter)
        .cursor({})
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(fixEmployeeAccesses, { continueOnError: true });
    console.log('Fixed data count', count);
}
