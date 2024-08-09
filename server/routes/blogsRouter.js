import express from 'express';
import {
  addBlog,
  getBlogs,
  toggleBlogLiking,
} from '../controllers/blogsController.js';
const router = express.Router();

router.get('/getblogs', getBlogs);
router.post('/addblog', addBlog);
router.post('/liking', toggleBlogLiking);
export default router;
