import { ordersBefore0917 } from './records/ordersBefore0917.js';
import { parseCsv } from '../../utils/index.js';
import _ from 'lodash';

function toSequenceNumber(endTrxNumber) {
    if (!endTrxNumber) {
        return -1;
    }
    const number = endTrxNumber.slice(-8);
    return parseInt(number);
}

export async function test() {
    const fixedYsd = await parseCsv(
        'src/scripts/PS-5918/records/zreadingWithStartNumberIssue3.csv',
    );
    const origin = await parseCsv('src/scripts/PS-5918/records/Fix Start Info 10-05-22:55.csv');
    fixedYsd.forEach(({ zreadingId, startTrxNumber, startORNumber, endTrxNumber, endORNumber }) => {
        const originZReading = origin.find((o) => o.zreadingId === zreadingId);
        if (
            toSequenceNumber(originZReading.startORNumber) < Number(startORNumber) ||
            toSequenceNumber(originZReading.startTrxNumber) < Number(startTrxNumber)
        ) {
            console.log('omg');
        }
    });
}

test().then(console.log);
