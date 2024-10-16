import mongoose from "mongoose"
import {DB_NAME} from "../src/constants.js"


const connectDB = async() =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB connected !! DB HOST ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongoDB connection error", error);
        
    }
}

export default connectDB;