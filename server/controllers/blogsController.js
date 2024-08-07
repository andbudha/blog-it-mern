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

export { addBlog, getBlogs };
