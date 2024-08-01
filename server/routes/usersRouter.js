import express from 'express';
import {
  getAllUsers,
  registerNewUser,
  loginUser,
  getUserProfile,
  updateProfileDetails,
  uploadProfileImage,
} from '../controllers/usersController.js';
import JWTAuth from '../middlewares/JWTAuth.js';
import { multerUpload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', loginUser);
router.post('/updatedetails', updateProfileDetails);
router.post(
  '/uploadimage',
  multerUpload.single('profileImage'),
  uploadProfileImage
);
router.get('/profile', JWTAuth, getUserProfile);
router.get('/all', getAllUsers);

export default router;
