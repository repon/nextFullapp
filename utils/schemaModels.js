import mongoose, { mongo, Mongoose } from "mongoose";

const Schema = mongoose.Schema

const ItemSchema = new Schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
})

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
})

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema)
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
