import mongoose, { Document } from 'mongoose';
interface RateConfigInterface extends Document {
    ecommerce?: number;
    beepInStore?: number;
    beepDelivery?: number;
    beepPickUp?: number;
    beepTakeaway?: number;
    beepSelfDelivery?: number;
}
interface CustomTransactionFeeRateInterface extends Document {
    business: string;
    rateConfig: RateConfigInterface;
    createdTime: Date;
    modifiedTime: Date;
}
declare const CustomTransactionFeeRateModel: mongoose.Model<CustomTransactionFeeRateInterface, {}, {}>;
export default CustomTransactionFeeRateModel;
