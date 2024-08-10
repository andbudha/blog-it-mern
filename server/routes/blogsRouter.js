import express from 'express';
import {
  addBlog,
  getBlogs,
  getFavoriteBlogs,
  toggleBlogLiking,
} from '../controllers/blogsController.js';
const router = express.Router();

router.get('/getblogs', getBlogs);
router.get('/getfavorites', getFavoriteBlogs);
router.post('/addblog', addBlog);
router.post('/liking', toggleBlogLiking);
export default router;
