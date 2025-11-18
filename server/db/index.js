import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined. Ensure your .env file is loaded. Expected at project root and loaded via dotenv in server/server.js (path: ../.env)");
    }

    const connectionInstance = await mongoose.connect(uri);
    console.log(
      `\n MongoDB connected !! DB Host:${connectionInstance.connection.host} on port ${process.env.PORT}`
    );
  } catch (error) {
    console.error("mongoDb connnection failed :", error);
    process.exit(1);
  }
};

export default connectDB;
