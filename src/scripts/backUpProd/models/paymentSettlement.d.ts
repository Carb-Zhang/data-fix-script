import { Model, Document } from 'mongoose';
import { ObjectId } from 'bson';

declare const PaymentSettlement: Model<PaymentSettlementSchema>;
export default PaymentSettlement;

export interface PaymentSettlementSchema extends Document {
    businessName: string,
    planId: string,
    currency: string,
    orders: SettleOrderSchema[],
    totalOrdersAmount: number,
    totalPaymentGatewayFee: number,
    totalStorehubFee: number,
    totalStorehubLogisticsFee: number,
    totalPayout: number,
    merchantBankName: string,
    merchantBankAccountNumber: string,
    startDate: Date,
    endDate: Date,
    orderCount?: number,
    createdTime: Date,
    modifiedTime: Date,
    totalStorehubLogisticsCost: number,
    totalPaymentGatewayCost: number,
    totalStorehubLogisticsRevenue: number,
    totalPaymentGatewayRevenue: number,
    totalBankTransactionFee: number,
    totalProductRevenue: number,
    totalDeliveryRevenue: number,
}

export interface SettleOrderSchema {
    receiptNumber: string,
    total?: number,
    storehubFee: number,
    storehubLogisticsFee: number,
    paymentGatewayFee: number,
    payout: number,
    paymentGateway: string,
    createdTime: Date
    storehubLogisticsCost: number,
    paymentGatewayCost: number,
    storehubLogisticsRevenue: number,
    paymentGatewayRevenue: number,
    productRevenue: number,
    deliveryRevenue: number,
}

