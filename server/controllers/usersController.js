import { UserModel } from '../models/userModel.js';

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    console.log(allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong!' });
  }
};

export { getAllUsers };
