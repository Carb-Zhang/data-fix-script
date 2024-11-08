import { Model, Document } from 'mongoose';

export default Model;

export interface ThirdPartyOnlineOrderSchema extends Document {
  channel: number,
  orderId: string,
  content: object,
  isCancellationNotTakeEffect: boolean,
}
