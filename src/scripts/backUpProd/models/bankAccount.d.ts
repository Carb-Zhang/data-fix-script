import { Document, Model } from 'mongoose';

export interface BankAccountSchema extends Document {
    business?: string;

    bankName?: string;

    bankCode?: string;

    bankAccountNumber?: string;

    holderName?: string;

    emails?: string[];

    appliedStores?: string[];

    isDeleted?: boolean;

    createdTime?: Date;

    updatedTime?: Date;
}

declare const BankAccount: Model<BankAccountSchema>;
export default BankAccount;
