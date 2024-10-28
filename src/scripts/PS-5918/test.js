import { ordersBefore0917 } from './records/ordersBefore0917.js';
import { parseCsv } from '../../utils/index.js';
import _ from 'lodash';

function findDuplicates(arr) {
    const seen = {};
    const duplicates = [];

    arr.forEach((item) => {
        if (seen[item]) {
            if (seen[item] === 1) {
                duplicates.push(item);
            }
            seen[item]++;
        } else {
            seen[item] = 1;
        }
    });

    return duplicates;
}

export async function test() {
    const orders = await parseCsv('src/scripts/PS-5918/records/allOrders.csv', true);
    const zreadingToCreateTime = {};
    orders.forEach(({ business, storeId, registerId, createdTime }) => {
        const key = `${business} ${storeId} ${registerId}`;
        const date = new Date(createdTime);
        if (!zreadingToCreateTime[key] || date < zreadingToCreateTime[key]) {
            zreadingToCreateTime[key] = new Date(createdTime);
        }
    });
    
    const arr = [];
    for (const key in zreadingToCreateTime) {
        const [business, storeId, registerId] = key.split(' ');
        arr.push({
            business,
            storeId,
            registerId,
            firstOrderCreateTime: zreadingToCreateTime[key].toISOString(),
        });
    }
    
    console.log(arr);
}

test().then(console.log);
