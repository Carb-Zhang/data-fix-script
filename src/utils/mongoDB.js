import mongoose from 'mongoose';

export async function connectMongoDB() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('[MONGODB CONNECTED]');
}
