import mongoose from "mongoose";
// import { DB_NAME } from "../constant.js";
// import express from 'express';

const connectDB = async () => {
    try {
       const connetionInstance=await mongoose.connect(`${process.env.MONGODB_URI}}`);
       console.log(`MongoDB connected: ${connetionInstance.connection.host}`);
    } catch (error) {
      console.error(`\n MongoDB connection failed: ${error}`);
      process.exit(1); 
    }
}
export default connectDB;