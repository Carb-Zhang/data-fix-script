import { Types, Document } from 'mongoose';
interface ChargingRule {
    chargingType: string;
    chargingValue: number;
}
interface FeeRule {
    orderChannel: string;
    shippingType: string;
    paymentChannel: string;
    calculationType: string;
    chargingRules: ChargingRule[];
}
export interface CustomPaymentGatewayFeeDocument extends Document<Types.ObjectId> {
    business: string;
    feeRules: FeeRule[];
    createdTime: Date;
    modifiedTime: Date;
}
declare const CustomPaymentGatewayFeeModel: import("mongoose").Model<CustomPaymentGatewayFeeDocument, {}, {}>;
export default CustomPaymentGatewayFeeModel;
