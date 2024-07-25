import express from 'express';
import {
  getAllUsers,
  registerNewUser,
  loginUser,
} from '../controllers/usersController.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', loginUser);
router.get('/all', getAllUsers);

export default router;
