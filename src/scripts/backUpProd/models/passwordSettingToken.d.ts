import { Model, Document } from 'mongoose';
import { ObjectId } from 'bson';

declare const PasswordSettingToken: Model<PasswordSettingTokenSchema>;
export default PasswordSettingToken;

export interface PasswordSettingTokenSchema extends Document {
    token: string;

    expiryDate: string;

    isRedeemed: boolean;
}
