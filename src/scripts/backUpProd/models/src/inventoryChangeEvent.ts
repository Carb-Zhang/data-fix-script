import { Document, Types, LeanDocument, Schema, model } from 'mongoose';

export enum InventoryChangeUpdateType {
    INC = 'INC',
    SET = 'SET',
}

export enum InventoryChangeUpdateRule {
    ALLOW_NEGATIVE = 'ALLOW_NEGATIVE',
    NOT_ALLOW_NEGATIVE = 'NOT_ALLOW_NEGATIVE',
    EXPECT_MIN_QUANTITY_BEFORE_UPDATE = 'EXPECT_MIN_QUANTITY_BEFORE_UPDATE',
}

export enum InventoryChangeRule {
    SKIP_NONE_EXIST_INVENTORY = 'SKIP_NONE_EXIST_INVENTORY',
    SKIP_TYPE_CHANGED_INVENTORY = 'SKIP_TYPE_CHANGED_INVENTORY',
}

export enum InventoryChangeUpdateStatus {
    SUCCESS = 'SUCCESS',
    SKIPPED = 'SKIPPED',
    FAIL = 'FAIL',
    ROLLBACKED = 'ROLLBACKED',
    ROLLBACK_FAIL = 'ROLLBACK_FAIL',
}

export enum InventoryChangeEventType {
    STOCK_PURCHASE = 'STOCK_PURCHASE',
    STOCK_RETURN = 'STOCK_RETURN',
    STOCK_TRANSFER = 'STOCK_TRANSFER',
    STOCK_TAKE = 'STOCK_TAKE',
    ORDER_OFFLINE_PLACE = 'ORDER_OFFLINE_PLACE',
    ORDER_OFFLINE_CANCEL = 'ORDER_OFFLINE_CANCEL',
    ORDER_OFFLINE_RESTOCK = 'ORDER_OFFLINE_RESTOCK',
    MANUAL_EDIT_INVENTORY = 'MANUAL_EDIT_INVENTORY',
    PRODUCTS_IMPORT = 'PRODUCTS_IMPORT',
    ORDER_ONLINE_BEEP_PAY_FIRST_PLACE = 'ORDER_ONLINE_BEEP_PAY_FIRST_PLACE',
    ORDER_ONLINE_BEEP_PAY_FIRST_CANCEL = 'ORDER_ONLINE_BEEP_PAY_FIRST_CANCEL',
    ORDER_ONLINE_BEEP_PAY_LATER_PLACE = 'ORDER_ONLINE_BEEP_PAY_LATER_PLACE',
    ORDER_ONLINE_BEEP_PAY_LATER_CANCEL = 'ORDER_ONLINE_BEEP_PAY_LATER_CANCEL',
    ORDER_ONLINE_THIRD_PARTY_PLACE = 'ORDER_ONLINE_THIRD_PARTY_PLACE',
    ORDER_ONLINE_THIRD_PARTY_CANCEL = 'ORDER_ONLINE_THIRD_PARTY_CANCEL',
}

export enum InventoryChangeEventStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESS = 'SUCCESS',
    UPDATE_FAIL = 'UPDATE_FAIL',
    VALIDATE_FAIL = 'VALIDATE_FAIL',
    ROLLBACKED = 'ROLLBACKED',
    ROLLBACK_FAIL = 'ROLLBACK_FAIL',
}

const inventoryChangeUpdateSchema = new Schema({
    // raw info
    productId: String,
    updateType: { type: String, enum: Object.values(InventoryChangeUpdateType) },
    updateAmount: Number,
    storeId: String,
    restockLevel: Number,
    desiredStockLevel: Number,
    updateRule: { type: String, enum: Object.values(InventoryChangeUpdateRule) },
    expectMinQuantity: Number,

    // track info
    amountBefore: Number,
    amountAfter: Number,
    status: { type: String, enum: Object.values(InventoryChangeUpdateStatus) },
    updatedAt: Date,
    failedAt: Date,
    rollbackedAt: Date,
    rollbackFailedAt: Date,
    failReason: String,
    rollbackFailReason: String,
});

const inventoryChangeEventSchema = new Schema(
    {
        // raw info
        eventId: String,
        business: String,
        storeId: String,
        eventType: { type: String, enum: Object.values(InventoryChangeEventType) },
        eventStartAt: Date,
        updateRule: { type: String, enum: Object.values(InventoryChangeUpdateRule) },
        rules: {
            type: [
                {
                    type: String,
                    enum: Object.values(InventoryChangeRule),
                },
            ],
        },
        updates: [inventoryChangeUpdateSchema],
        createInvIfNotExist: Boolean,
        needDedupMsg: Boolean,
        sourceInfo: {
            refId: String,
            customFields: Schema.Types.Mixed,
        },

        // track info
        status: { type: String, enum: Object.values(InventoryChangeEventStatus) },
        succeededAt: Date,
        failedAt: Date,
        rollbackedAt: Date,
        rollbackFailedAt: Date,
        failReason: String,
        retryCount: Number,
        isNeedManualCheck: Boolean,
        isEventIdsCleared: Boolean,
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
        timestamps: true,
    },
);

inventoryChangeEventSchema.index({ eventId: 1 }, { unique: true });
inventoryChangeEventSchema.index({ 'sourceInfo.refId': 1 });
inventoryChangeEventSchema.index({ createdAt: 1 });
inventoryChangeEventSchema.index({ succeededAt: 1 });
inventoryChangeEventSchema.index({ 'updates.productId': 1 });

export interface IInventoryChangeUpdate {
    productId: string;
    updateType: InventoryChangeUpdateType;
    updateAmount: number;
    storeId?: string;
    restockLevel?: number;
    desiredStockLevel?: number;
    updateRule?: InventoryChangeUpdateRule;
    expectMinQuantity?: number;

    amountBefore?: number;
    amountAfter?: number;
    status?: InventoryChangeUpdateStatus;
    updatedAt?: Date;
    failedAt?: Date;
    rollbackedAt?: Date;
    rollbackFailedAt?: Date;
    failReason?: string;
    rollbackFailReason?: string;
}

export interface IInventoryChangeEvent {
    eventId: string;
    business: string;
    storeId: string;
    eventType: InventoryChangeEventType;
    eventStartAt: Date;
    updateRule: InventoryChangeUpdateRule;
    updates: IInventoryChangeUpdate[];
    createInvIfNotExist: boolean;
    needDedupMsg: boolean;
    sourceInfo: {
        refId: string;
        customFields?: Record<string, string>;
    };
    rules?: InventoryChangeRule[];

    status: InventoryChangeEventStatus;
    succeededAt?: Date;
    failedAt?: Date;
    rollbackedAt?: Date;
    rollbackFailedAt?: Date;
    failReason?: string;
    retryCount?: number;
    isNeedManualCheck?: boolean;
    isEventIdsCleared?: boolean;
    createdAt?: Date;
}

export type InventoryChangeEventDoc = IInventoryChangeEvent & Document<Types.ObjectId>;

export type InventoryChangeEventDocPOJO = LeanDocument<InventoryChangeEventDoc>;

export default model<InventoryChangeEventDoc>('inventoryChangeEvent', inventoryChangeEventSchema);
