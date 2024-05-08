import FoodDeliveryPlatformSettings from '../../models/addOns/foodDeliveryPlatformSettings.js';

export async function run() {
    const res = await FoodDeliveryPlatformSettings.updateMany(
        {
            platform: 10,
            addOnVersion: 'v2',
        },
        {
            $set: {
                'outlets.$[].isSyncTaxExclusivePrice': true,
            },
        },
    );
    console.log(res);
}
