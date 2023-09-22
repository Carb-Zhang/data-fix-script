import InventoryModel from '../models/inventory.js';

export async function run() {
    const count = await InventoryModel.count({});
    console.log(count);
}
