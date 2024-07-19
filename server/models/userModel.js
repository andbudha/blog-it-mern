import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
});
export const UserModel = mongoose.model('user', userSchema);
