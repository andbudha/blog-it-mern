import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    blogID: { type: String, required: true },
    userID: { type: String, required: true },
    profileImage: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    commentary: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const blogSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: String }],
    comments: [commentSchema],
  },
  { versionKey: false, timestamps: true }
);

export const BlogModel = mongoose.model('blog', blogSchema);
