import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    blogList: [],
    favoriteBlogList: [],
  },
  {
    versionKey: false,
  }
);
export const UserModel = mongoose.model('user', userSchema);
