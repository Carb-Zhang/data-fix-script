import { Schema, Document, model } from 'mongoose';

export interface SampleDocument extends Document {
    name: string;
}

const SampleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        autoIndex: process.env.NODE_ENV == 'development',
    },
);

const SampleModel = model<SampleDocument>('sample', SampleSchema);

export default SampleModel;