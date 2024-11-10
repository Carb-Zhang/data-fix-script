import mongoose from 'mongoose';

export async function connectMongoDB() {
    // await mongoose.connect(process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL, { connectTimeoutMS: 50000 });
    console.log('[MONGODB CONNECTED]');
}
