import ThirdPartyOnlineOrder from '../../models/thirdPartyOnlineOrder.js';

const merchantIds = [
    '1-CZATJZBFFCMJJ2',
    '1-CZATJZBFTA6UJ6',
    '1-CZATJZBGVADGTJ',
    '1-CZATJZBHCUVEUA',
    '1-CZATJZBFLXCASE',
    '1-CZATJZBFAJMEBE',
    '1-CZATJZBGAN6HLE',
    '1-CZATJZBGG34JE6',
    '1-C3E1GKTYT65THE',
    '1-CZATJZBERPN3E6',

    // test
    '1-CYLBT7CVJUVHDE-1',
];
const field1 = 'fare.totalDiscountAmountDisplay';
const field2 = 'fare.promotionDisplay';

function handleOrder(order) {
    if (!order) {
        return false;
    }
    const rawData = JSON.parse(order.content.portalOrder || '""');
    if (rawData && rawData[field1] !== '' && rawData[field2] !== '') {
        console.log(order.orderId);
        return true;
    } else {
        return false;
    }
}

async function findThirdPartyOnlineOrder() {
    const cursor = ThirdPartyOnlineOrder.default
        .find({
            channel: 10,
            'content.merchantID': { $in: merchantIds },
        })
        .cursor();
    let count = 0;
    for (
        let order = await cursor.next();
        count < 3 && order !== null;
        order = await cursor.next()
    ) {
        const findOrder = handleOrder(order);
        if (findOrder) {
            count++;
        }
    }
}

export async function run() {
    await findThirdPartyOnlineOrder();
}
