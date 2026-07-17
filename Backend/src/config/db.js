import mongoose from "mongoose";
import config from "./config.js";

async function dbConnect(){
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default dbConnect;