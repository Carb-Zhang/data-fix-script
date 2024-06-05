import OnlineTransaction from '../../models/onlineTransaction.js';
import _ from 'lodash';

let count = 0;

async function _fixData(order) {
    let needFix = false;
    _.forEach(order.items || [], (item) => {
        if (item.total !== item.subTotal) {
            console.log(`${item._id}: ${item.total}`);
            item.total = item.subTotal;
            needFix = true;
        }
    });
    if (!needFix) {
        return;
    }
    count++;
    await order.save();
}

async function fixData(order) {
    try {
        await _fixData(order);
    } catch (err) {
        console.log('Error for', order._id, err);
    }
}

export async function run() {
    await OnlineTransaction.find({
        channel: { $in: [10, 11, 12] },
        createdTime: {
            $gt: new Date('2024-06-05T14:30:33.000+08:00'),
            $lt: new Date('2024-06-05T14:50:33.000+08:00'),
        },
    })
        .sort({ _id: -1 })
        .select({ items: 1 })
        .cursor({})
        .addCursorFlag('noCursorTimeout', true)
        .eachAsync(fixData, { continueOnError: true });
    console.log('Fixed data count', count);
}
