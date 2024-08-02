import { UserModel } from '../models/userModel.js';
import { encryptPassword, verifyPassword } from '../utils/passwordServices.js';
import { imageUpload } from '../utils/profileImageServices.js';
import { removeTempFile } from '../utils/temporaryFileServices.js';
import { generateToken } from '../utils/tokenServices.js';

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
    if (!existingEmail && !existingFirstName && !existingSecondName) {
      try {
        const encryptedPassword = await encryptPassword(req.body.password);
        if (encryptPassword) {
          const newUser = await UserModel.create({
            ...req.body,
            profileImage: '',
            password: encryptedPassword,
          });
          res.status(200).json({
            message:
              'User successfully registered. You may proceed to logging in now!',
            newUser: { email: newUser.email, password: newUser.password },
          });
        }
      } catch (error) {
        console.log('Passowrd encrypting error::::'), error;
        return;
      }
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
    }
    const token = generateToken(existingUser._id);
    if (!token) {
      console.log('Token geretation error"');
      res.status(401).json({
        message: 'Token generation failed. Try again later, please!',
      });
    }
    if (token) {
      res.status(200).json({
        message: 'You have successfully logged in!',
        user: {
          userID: existingUser._id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          secondName: existingUser.secondName,
          profileImage: '',
        },
        token,
      });
    }
  } catch (error) {
    res.status(404).json({ errorMessage: 'Server error. User login failed!' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        message: 'User profile succeccfully received!',
        user: req.user,
      });
    }
  } catch (error) {
    res.status(500).json('Getting user profile failed!');
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

const updateProfileDetails = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      {
        _id: req.body.userID,
      },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        maritalStatus: req.body.maritalStatus,
      },
      { new: true }
    );
    res.status(200).json({
      message: 'Profile successfully updated!',
      updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: 'Server error. Updating profile failed!' });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    let profileImageURL;
    if (req.file) {
      profileImageURL = await imageUpload(req.file, 'blog_it');
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      {
        _id: req.body.userID,
      },
      {
        profileImage: profileImageURL.secure_url,
        profileImagePublicID: profileImageURL.public_id,
      },
      { new: true }
    );
    res.status(200).json({
      message: 'Profile image successfully updated!',
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: 'Server error. Updating profile image failed!' });
  } finally {
    removeTempFile(req.file);
  }
};

export {
  getAllUsers,
  registerNewUser,
  loginUser,
  getUserProfile,
  updateProfileDetails,
  uploadProfileImage,
};
