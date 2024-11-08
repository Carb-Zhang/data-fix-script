import { Document, Model, Schema } from 'mongoose';

export interface CustomerInfo {
    business: string;

    customerId: string;

    firstName?: string;

    lastName?: string;

    email?: string;

    phone?: string;

    birthday?: Date;

    memberId?: string;

    street1?: string;

    street2?: string;

    city?: string;

    state?: string;

    postalCode?: string;

    createdTime?: Date;

    modifiedTime?: Date;

    signUpByEmployee?: string;

    isDeleted?: boolean;

    tags?: string[];

    lastPurchaseDate?: Date;

    totalSpent?: number;

    totalTransactions?: number;

    purchasedInStores?: string[];

    taxIdNo?: string;

    storeCreditsBalance?: number;

    storeCreditsSpent?: number;

    consumerId?: string;

    cashbackClaimCnt?: number;

    lastCashbackClaimDate?: Date;

    facebook?: string;

    originalConsumerId?: string;

    cashbackExpirationDate?: Date;

    firstPurchaseInfo?: {
        date:  Date,
        storeId:  String,
        registerId: String,
        employeeId: String,
        transactionId: String
    };
  
    source?: string;

    membershipTierId?: string;

    membershipSource?: string;

    tmpCashbackExpirationDate?: Date;

    membershipTierTotalSpent?: number;

    membershipTierTotalSpentUpdatedTime?: Date;

    membershipJoinTime?: Date;

    membershipTierStartTime?: Date;

    membershipTierNextReviewTime?: Date;

    membershipTierLastChangeTime?: Date;

    sourceRefId?: string;

    createdAtStoreId?: string;

    membershipCreatedAtStoreId?: string;
}

export interface CustomerSchema extends Document, CustomerInfo {}

declare const Customer: Model<CustomerSchema>;
export default Customer;
