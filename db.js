import mongoose from 'mongoose';

const connectDB = async () => {

    // Ensure environment variables are set
    const rawUrl = process.env.MONGODB_URL;
    const password = process.env.MONGODB_PASSWORD;
    
    // Validate that the environment variables are defined
    if(!rawUrl || !password) {
        throw new Error('MONGODB_URL or MONGODB_PASSWORD is not defined in environment variables');
    }

    const url = rawUrl.replace('<password>', password);
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export default connectDB;