import { UserModel } from '../models/userModel.js';

const registerNewUser = async (req, res) => {
  console.log(req.body);
  try {
    const existingEmail = await UserModel.findOne({ email: req.body.email });

    const existingFirstName = await UserModel.findOne({
      firstName: req.body.firstName,
    });
    const existingSecondName = await UserModel.findOne({
      secondName: req.body.secondName,
    });

    if (existingEmail) {
      res.status(500).json({
        errorMessage: 'Email already in use. Pick another email, please!',
      });
      return;
    }
    if (existingFirstName && existingSecondName) {
      res.status(500).json({
        errorMessage:
          'User under the entered first-name and second-name already registered. Pick other names, please!',
      });
      return;
    }
    if (!existingEmail) {
      const newUser = await UserModel.create(req.body);
      res.status(200).json({
        message:
          'User successfully registered. You may proceed to logging in now!',
        newUser: { email: newUser.email },
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        'Server error. New user has not been registered. Try again, please!',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(401).json({
        errorMessage:
          'Either the user does not exist or the entered credentials are invalid!',
      });
    } else {
      res.status(200).json({
        message: 'You have successfully logged in!',
        user: {
          userID: existingUser._id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          secondName: existingUser.secondName,
          profileImage: '',
        },
      });
    }
  } catch (error) {
    res.status(401).json({ errorMessage: 'Server error. User login failed!' });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    console.log(allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong!' });
  }
};

export { getAllUsers, registerNewUser, loginUser };
