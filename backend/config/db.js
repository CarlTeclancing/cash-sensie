import { connect } from "http2";
import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB connected")
    })
await mongoose.connect(`${process.env.MONGODB_URI}/cash-sensie`)
}
export default connectDB