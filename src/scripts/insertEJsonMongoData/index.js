import { EJSON } from 'bson';
import { readFileSync } from 'fs';
import InventoryChangeEventModel from '../../models/inventoryChangeEvent.js';

export async function run() {
    const bsonData = readFileSync('src/scripts/insertEJsonMongoData/eJsonData/index.json', 'utf-8');
    const objs = EJSON.parse(bsonData);
    await InventoryChangeEventModel.default.insertMany(objs);
}
