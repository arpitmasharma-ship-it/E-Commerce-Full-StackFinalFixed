import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ DB Connected");

  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};

export default connectDB;