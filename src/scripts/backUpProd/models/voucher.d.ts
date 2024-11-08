import { Model, Document, LeanType } from 'mongoose';

declare const Voucher: Model<VoucherSchema>;
export default Voucher;

export interface VoucherSchema extends Document {
    voucherCode: string;
    value: number;
    cost: number;
    currency: string;
    validFrom?: Date;
    validTo?: Date;
    status: string;
    minSpend?: number;
    channel: number;
    createdTime?: Date;
    modifiedTime?: Date;
    redeemedOrderId?: string;
    business?: string;
    createdByOrderId?: string;
    purchaseChannel?: string;
    remarks?: string;
    consumerId?: string;
    name?: string;
    applicableBusiness?: string[];
    coveredBySH?: boolean;
    voidReason?: string;
    appliedSources?: number[];
    appliedClientTypes?: string[];
    category?: string;
}

export type VoucherLeanType = LeanType<VoucherSchema>;
