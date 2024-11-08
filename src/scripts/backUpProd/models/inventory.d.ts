// @ts-ignore
import { Model, Document, LeanDocument } from 'mongoose';
import { ObjectId } from 'bson';

export interface InventorySchema extends Document {
    business: string;

    storeId: string;

    productId: string;

    quantityOnHand: number;

    restockLevel: number;

    desiredStockLevel: number;

    isSerialized: boolean;

    pendingTransactions: ObjectId[];

    pendingReturnProcess: ObjectId[];

    pendingPurchaseOrders: ObjectId[];

    pendingStockTakes: ObjectId[];

    pendingStockTransfers: ObjectId[];

    pendingCancelledStockTransfers: ObjectId[];

    pendingManualUpdateLogs: string[];

    pendingStockReturns: ObjectId[];

    supplyNeedsNotified: boolean;

    appliedEventIds: string[];

    updatedAtInMs: number;
}

export type InventoryDocPOJO = LeanDocument<InventorySchema>;

declare const Inventory: Model<InventorySchema>;
export default Inventory;
