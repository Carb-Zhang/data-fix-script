import FoodDeliveryPlatformSettings from '../../models/addOns/foodDeliveryPlatformSettings.js';

export async function run() {
    await FoodDeliveryPlatformSettings.updateMany(
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
}
