import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URL)
  } catch (err) {
    console.log("Failture: Unconnected to MongoDB")
    console.log(err)
    throw new Error()
  }
}

export default connectDB
