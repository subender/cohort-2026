import mongoose from 'mongoose'
import { env } from './env.confing.js'


const connectDb = async ()=>{
    
    try {
        const connection = await mongoose.connect(env.MONGODB_URI)
        console.log(`Mongo DB connect. DB Host: ${connection.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection FAILED:", error);
    }
    

}

export default connectDb;