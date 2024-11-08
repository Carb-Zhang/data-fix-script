import { Schema } from 'mongoose';

export default Schema;

export interface OwnerTransferTokenSchema {
    token?: string;

    expiryDate?: string;

    newOwnerId?: string;

    //Possible values are
    // 1. requested
    // 2. confirmed (confirmed means old owner has confirmed ownership transfer request through 2-factor confirmation, e.g. email)
    // 3. completed
    status?: string;
}
