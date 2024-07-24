import express from 'express';
import {
  getAllUsers,
  registerNewUser,
} from '../controllers/usersController.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.get('/all', getAllUsers);

export default router;
