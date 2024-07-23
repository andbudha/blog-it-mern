import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  blogList: [],
  favoriteBlogList: [],
});
export const UserModel = mongoose.model('user', userSchema);
