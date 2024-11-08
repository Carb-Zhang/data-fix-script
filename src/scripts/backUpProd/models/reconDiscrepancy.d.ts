import { Document } from 'mongoose';
interface ReconDiscrepancyPayoutItem {
    paidAmount: number;
    payoutType: string;
    itemId: string;
    settledAt: Date;
}
interface ReconDiscrepancyGatewayRecord {
    transactionAmount: number;
    transactionId: string;
    transactionType: string;
    settlementTime: Date;
}
export interface ReconDiscrepancyLog {
    event: string;
    date: Date;
    payoutItems?: ReconDiscrepancyPayoutItem[];
    gatewayRecords?: ReconDiscrepancyGatewayRecord[];
}
interface ReconDiscrepancy extends Document {
    discrepancyType: string;
    receiptNumber: string;
    payoutItems?: ReconDiscrepancyPayoutItem[];
    gatewayRecords?: ReconDiscrepancyGatewayRecord[];
    isResolved: boolean;
    createdTime: Date;
    modifiedTime: Date;
    logs: ReconDiscrepancyLog[];
}
declare const ReconDiscrepancyModel: import("mongoose").Model<ReconDiscrepancy, {}, {}>;
export default ReconDiscrepancyModel;
