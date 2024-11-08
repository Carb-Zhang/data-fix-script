import ShiftModel from '../../../models/shift.js';
import BusinessModel from '../../../models/business.js';
import { parseCsv } from '../../../utils/csv.js';

import _ from 'lodash';

export async function test() {
    const registers = await parseCsv('src/scripts/PS-5918/test.csv');
    let businessInfos = await BusinessModel.find({
        name: { $in: registers.map(({ business }) => business) },
    }).lean();
    businessInfos = null;
    console.log(businessInfos);
    registers.forEach(({ registerId }) => {
        const register = businessInfos.find(
            (bus) => bus.cashRegisters._id.toString() === registerId,
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
            console.log([shift.registerId, shift.shiftId, shift.closeTime].join(','));
        });
    }
}
