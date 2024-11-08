import { Model, Document, LeanDocument } from 'mongoose';
import { UserActionLog } from './userActionLog';

export interface ComponentUsageSchema extends Document {
    productId: string;
    quantity: number;
    lockedQuantity: number;
    lockedDate: Date;
}

export interface PurchaseOrderItemSchema extends Document {
    productId: string;
    orderedQuantity: number;
    supplierPrice: number;
    receivedQuantity: number;
    subTotal: number;
    componentsUsages: ComponentUsageSchema[];
    isSerialized: boolean,
    serialNumbers: string[],
}

export interface PurchaseOrderSchema extends Document {
    business: string;
    purchaseOrderId: number;
    createdTime: Date;
    modifiedTime: Date;
    expectedArrivalDate: Date;
    supplierId: string;
    targetStoreId: string;
    total: number;
    subTotal: number;
    discount: number;
    tax: number;
    notes: string;
    status: string;
    orderedItems: PurchaseOrderItemSchema[];
    failedToUpdateInventory: boolean;
    completedBy: string;
    inventoryChangeMsgTrackInfo: {
        isSendMsg: boolean;
        sendMsgStartAt: Date;
        eventId: string;
    };
    userActionLogs?: UserActionLog[];
}

export type PurchaseOrderDocPOJO = LeanDocument<PurchaseOrderSchema>;

declare const PurchaseOrder: Model<PurchaseOrderSchema>;
export default PurchaseOrder;
