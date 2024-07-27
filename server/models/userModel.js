import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    maritalStatus: { type: String },
    age: { type: String },
    blogList: [],
    favoriteBlogList: [],
  },
  {
    versionKey: false,
  }
);
export const UserModel = mongoose.model('user', userSchema);
