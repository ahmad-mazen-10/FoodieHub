import mongoose from "mongoose";

export const DB_Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Database connected successfully` );
  } catch (error: any) {
    console.error("Error connecting to database:", error);
  }
};
