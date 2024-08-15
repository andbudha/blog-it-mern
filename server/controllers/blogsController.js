import { BlogModel } from '../models/blogModel.js';
import { UserModel } from '../models/userModel.js';

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
const getFavoriteBlogs = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.query.userID,
    }).populate('favoriteBlogList');
    const favoriteBlogs = user.favoriteBlogList;
    res.status(200).json({ message: 'Favorite blogs fetched!', favoriteBlogs });
  } catch (error) {
    res.status(400).json({
      message: 'Fetching favorite blogs failed. Try again late, please!',
    });
  }
};
const addBlog = async (req, res) => {
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
  const existingBlog = await BlogModel.findOne({ _id: req.body.blogID });
  const liked = existingBlog.likes.filter(
    (userID) => userID === req.body.userID
  );
  try {
    if (liked.length > 0) {
      const blog = await BlogModel.findByIdAndUpdate(
        { _id: req.body.blogID },
        { $pull: { likes: req.body.userID } },
        { new: true }
      );
      const user = await UserModel.findByIdAndUpdate(
        { _id: req.body.userID },
        {
          $pull: { favoriteBlogList: req.body.blogID },
        },
        { new: true }
      );
      res.status(200).json({ message: 'You dislike this blog!', blog, user });
    } else if (liked.length === 0) {
      const blog = await BlogModel.findByIdAndUpdate(
        { _id: req.body.blogID },
        { $push: { likes: req.body.userID } },
        { new: true }
      );
      const user = await UserModel.findByIdAndUpdate(
        { _id: req.body.userID },
        {
          $push: { favoriteBlogList: req.body.blogID },
        },
        { new: true }
      );
      res.status(200).json({ message: 'You like this blog!', blog, user });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Disliking failed. Try again late, please!',
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete({ _id: req.body.blogID });
    res.status(200).json({ message: 'Blog successfully deleted!' });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Deleting blog failed. Try again later, please!',
    });
  }
};

const editBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(
      { _id: req.body.blogID },
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    res.status(200).json({ message: 'Blog successfully edited!', blog });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Blog editing failed. Try again later, please!',
    });
  }
};
const postCommentary = async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndUpdate(
      { _id: req.body.blogID },
      { $push: { comments: { ...req.body } } },
      { new: true }
    );
    res.status(200).json({ message: 'Commentary successfully posted!', blog });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Commentary posting failed. Try again later, please!',
    });
  }
};
const deleteCommentary = async (req, res) => {
  try {
    await BlogModel.findByIdAndUpdate(
      { _id: req.body.blogID },
      { $pull: { comments: { _id: req.body.commentaryID } } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: 'Commentary successfully deleted!' });
  } catch (error) {
    console.log('error deleting comment:::', error);

    res.status(500).json({
      error,
      message: 'Deleting commentary failed. Try again later, please!',
    });
  }
};

const editCommentary = async (req, res) => {
  console.log(req.body);

  try {
    const blog = await BlogModel.findByIdAndUpdate(
      {
        _id: req.body.blogID,
      },
      {
        $set: {
          'comments.$[outer].commentary': req.body.newCommentary,
        },
      },
      {
        arrayFilters: [{ 'outer._id': req.body.commentaryID }],
        new: true,
      }
    );
    res.status(200).json({ message: 'Commentary successfully edited!', blog });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Editing commentary failed. Try again later, please!',
    });
  }
};
export {
  addBlog,
  getBlogs,
  toggleBlogLiking,
  getFavoriteBlogs,
  deleteBlog,
  editBlog,
  postCommentary,
  deleteCommentary,
  editCommentary,
};
