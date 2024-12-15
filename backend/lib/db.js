import mongoose from 'mongoose';
const { set, connect } = mongoose;

export const connectToDB = async () => {
  try {
    const db = process.env.MONGO_URL;
    set("strictQuery", true);
    await connect(db);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}; 