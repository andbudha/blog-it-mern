import { BlogModel } from '../models/blogModel.js';

const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate('user');
    res.status(200).json({ message: 'All blogs received!', blogs });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Fetching blogs failed. Try again late, please!',
    });
  }
};
const addBlog = async (req, res) => {
  console.log(req.body);
  try {
    const newBlog = await BlogModel.create({ ...req.body });
    res
      .status(200)
      .json({ message: 'Blog successfully added!', blog: newBlog });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Adding new blog failed. Try again late, please!',
    });
  }
};

const toggleBlogLiking = async (req, res) => {
  console.log(req.body);
  const blog = await BlogModel.findOne({ _id: req.body.blogID });
  const liked = blog.likes.filter((userID) => userID === req.body.userID);

  try {
    if (liked.length > 0) {
      const existingBlog = await BlogModel.findByIdAndUpdate(
        { _id: req.body.blogID },
        { $pull: { likes: req.body.userID } },
        { new: true }
      );
      res.status(200).json({ message: 'You dislike this blog!', existingBlog });
    } else if (liked.length === 0) {
      const existingBlog = await BlogModel.findByIdAndUpdate(
        { _id: req.body.blogID },
        { $push: { likes: req.body.userID } },
        { new: true }
      );
      res.status(200).json({ message: 'You like this blog!', existingBlog });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Disliking failed. Try again late, please!',
    });
  }
};

export { addBlog, getBlogs, toggleBlogLiking };
