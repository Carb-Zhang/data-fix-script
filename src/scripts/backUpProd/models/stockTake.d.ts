import { Document, Types, LeanDocument } from 'mongoose';
import { UserActionLog } from './userActionLog';

interface Stocktake {
    business: string;
    description?: string;
    startTime: Date;
    completeTime?: Date;
    storeId: string;
    supplierId?: string;
    status: string;
    startedBy: string;
    completedBy?: string;
    totalQtyDiff?: number;
    totalCostDiff?: number;
    isMovedToStockTakeItems?: boolean;
    source?: string;
    isCountedOnSHManager?: boolean;
    userActionLogs?: UserActionLog[];
}

export type StocktakeDoc = Stocktake & Document<Types.ObjectId>;

export type StocktakeDocPOJO = LeanDocument<StocktakeDoc>;

declare const StocktakeModel: import('mongoose').Model<StocktakeDoc, {}, {}>;
export default StocktakeModel;
