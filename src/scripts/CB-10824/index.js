import Shift from '../../models/shift.js';
import OnlineTransaction from '../../models/onlineTransaction.js';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

function checkBeepShift(beepOrder, shifts) {
    for (const shift of shifts) {
        if (
            shift.beepTransactions &&
            shift.beepTransactions.find((it) => it.receiptNumber === beepOrder.receiptNumber)
        ) {
            // business,storeId,registerObjectId,receiptNumber,status,paymentMethod,shiftId,openTime
            const info = [
                shift.business,
                shift.storeId,
                shift.registerObjectId,
                beepOrder.receiptNumber,
                beepOrder.status,
                beepOrder.paymentMethod,
                shift.shiftId,
                shift.openTime,
            ];
            console.log(info.join(','));
        }
    }
}

export async function run() {
    const shifts = await Shift.find({
        business: 'thebasic',
        closeTime: { $gt: new Date('2024-06-25T16:19:05.733+08:00') },
    }).lean();
    await OnlineTransaction.find({
        business: 'thebasic',
        storeId: {
            $in: [new ObjectId('65bd0f6ebf157c00075fe3dd'), new ObjectId('63db1c557c462500073b0f43')],
        },
        channel: { $in: [3, 10, 11, 12] },
    })
        .sort({ _id: 1 })
        .cursor({})
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(
            (doc) => {
                checkBeepShift(doc, shifts);
            },
            { continueOnError: true },
        );
}
