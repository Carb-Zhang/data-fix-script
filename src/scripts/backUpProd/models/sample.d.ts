import { Document } from 'mongoose';
export interface SampleDocument extends Document {
    name: string;
}
declare const SampleModel: import("mongoose").Model<SampleDocument, {}, {}>;
export default SampleModel;
