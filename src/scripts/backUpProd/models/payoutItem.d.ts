import { Document } from 'mongoose';
declare enum PayoutType {
    PAY = "pay",
    COLLECT = "collect"
}
interface StorehubDetailsInterface extends Document {
    storehubLogisticsCost?: number;
    storehubLogisticsRevenue?: number;
}
interface AdjustmentDetailsInterface extends Document {
    reason?: string;
    remarks?: string;
    amount?: number;
    adjustmentItems?: AdjustmentItemInterface[];
}
interface AdjustmentItemInterface extends Document {
    refId: string;
    refType: string;
    amount: number;
    title: string;
    quantity: number;
    type: string;
}
export interface PayoutItemInterface extends Document {
    batchPayoutId?: string;
    businessName: string;
    storeId: string;
    countryCode: string;
    receiptNumber?: string;
    payoutStatus: string;
    payoutType: PayoutType;
    paymentGateway?: string;
    orderAmount?: number;
    paidAmount?: number;
    voucherAmount?: number;
    promotionAmount?: number;
    amount: number;
    settledAt: Date;
    transactionFeeRate?: number;
    transactionFee?: number;
    paymentGatewayFeeDetail: {
        calculationType: string;
        fixedAmountFee: number;
        rate: number;
    };
    paymentGatewayFee?: number;
    logisticsFee?: number;
    pickupSmsFee: number;
    productRevenue?: number;
    deliveryRevenue?: number;
    createdTime: Date;
    modifiedTime: Date;
    refId: string;
    refType: string;
    cause: string;
    storehubDetails: StorehubDetailsInterface;
    reconStatus: string;
    adjustmentDetails: AdjustmentDetailsInterface;
    refundedAmount?: number;
    orderVoucherAmount?: number;
    orderPromotionAmount?: number;
    offlinePaidAmount?: number;
    shippingType?: string;
}
declare const PayoutItemModel: import("mongoose").Model<PayoutItemInterface, {}, {}>;
export default PayoutItemModel;
