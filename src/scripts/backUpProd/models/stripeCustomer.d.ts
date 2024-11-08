import { Document } from 'mongoose';
interface StripeCustomerInterface extends Document {
    userId: string;
    stripeCustomerId: string;
}
declare const StripeCustomerModel: import("mongoose").Model<StripeCustomerInterface, {}, {}>;
export default StripeCustomerModel;
