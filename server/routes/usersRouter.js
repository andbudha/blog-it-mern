import express from 'express';
import {
  getAllUsers,
  registerNewUser,
  loginUser,
  getUserProfile,
  updateProfileDetails,
} from '../controllers/usersController.js';
import JWTAuth from '../middlewares/JWTAuth.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', loginUser);
router.post('/updatedetails', updateProfileDetails);
router.get('/profile', JWTAuth, getUserProfile);
router.get('/all', getAllUsers);

export default router;
