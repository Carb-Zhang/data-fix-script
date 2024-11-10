import ShiftModel from '../../../models/shift.js';
import BusinessModel from '../../../models/business.js';
import { parseCsv } from '../../../utils/csv.js';

import _ from 'lodash';

export async function test() {
    const registers = await parseCsv('src/scripts/PS-5918/supportPos/test.csv');
    let businessInfos = await BusinessModel.find({
        name: { $in: registers.map(({ business }) => business) },
    }).lean();
    registers.forEach(({ registerId, business }) => {
        const businessInfo = businessInfos.find((bus) => bus.name === business);
        const register = businessInfo.cashRegisters.find(
            (bus) => bus._id.toString() === registerId,
        );
        console.log([registerId, register.apiToken].join(','));
    });
    for (const re of registers) {
        const { business, registerId } = re;
        const shifts = await ShiftModel.find({
            business,
            registerObjectId: registerId,
        });
        shifts.forEach((shift) => {
            console.log([registerId, shift.shiftId, shift.closeTime.toISOString()].join(','));
        });
    }
}
