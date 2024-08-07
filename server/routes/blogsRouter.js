import express from 'express';
import { addBlog, getBlogs } from '../controllers/blogsController.js';
const router = express.Router();

router.get('/getblogs', getBlogs);
router.post('/addblog', addBlog);
export default router;
