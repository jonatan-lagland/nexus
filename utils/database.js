import mongoose from "mongoose";

let isConnected = false;
const HAS_CONNECTED = "MongoDB has connected."
const IS_CONNECTED = "MongoDB is already connected."
const DB_NAME = "save_the_nexus"

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log(IS_CONNECTED)
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME,
        })

        isConnected = true;
        console.log(HAS_CONNECTED)
    } catch (error) {
        console.log(error)
    }
}