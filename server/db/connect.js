import mongoose from "mongoose"

export const DB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connection successful: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection unsuccessful", error.message)
        process.exit(1); //1 is failure, 0 is success
    }
}