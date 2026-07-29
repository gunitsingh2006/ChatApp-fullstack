import mongoose from "mongoose";
export const connectDB = async ()=>{
    console.log(process.env.MONGO_URI);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error in connection to mongoDB" , error);
        process.exit(1);  // 1 means failure 
    }
}