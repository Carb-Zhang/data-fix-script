import { Model } from 'mongoose';
import { TransactionBaseSchema as TransactionSchema } from './transactionBase';

export { TransactionBaseSchema as TransactionSchema } from './transactionBase';

declare const TransactionRecord: Model<TransactionSchema>;
export default TransactionRecord;