import { Document, Types, Model } from 'mongoose';

export interface BlockAccountSchema extends Document {
    business: string;
    reason: string;
    refId?: string;
    refType?: string;
    blockPayout?: boolean;
    blockOnlineStore?: boolean;
    createdTime?: Date;
    updatedTime?: Date;
}

declare const BlockAccount: Model<BlockAccountSchema>;
export default BlockAccount;
