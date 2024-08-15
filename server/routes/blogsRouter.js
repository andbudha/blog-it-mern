import express from 'express';
import {
  addBlog,
  getBlogs,
  getFavoriteBlogs,
  toggleBlogLiking,
  deleteBlog,
  editBlog,
  postCommentary,
  deleteCommentary,
  editCommentary,
} from '../controllers/blogsController.js';
import JWTAuth from '../middlewares/JWTAuth.js';
const router = express.Router();

router.get('/getblogs', getBlogs);
router.get('/getfavorites', getFavoriteBlogs);
router.post('/addblog', addBlog);
router.post('/liking', toggleBlogLiking);
router.post('/delete-blog', deleteBlog);
router.post('/edit-blog', editBlog);
router.post('/post-commentary', postCommentary);
router.post('/delete-commentary', JWTAuth, deleteCommentary);
router.post('/edit-commentary', editCommentary);

export default router;
