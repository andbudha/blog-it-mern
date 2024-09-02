import { UserModel } from '../models/userModel.js';
import { encryptPassword, verifyPassword } from '../utils/passwordServices.js';
import {
  imageUpload,
  removeImageFromCloudinray,
} from '../utils/profileImageServices.js';
import { removeTempFile } from '../utils/temporaryFileServices.js';
import { generateToken } from '../utils/tokenServices.js';

const registerNewUser = async (req, res) => {
  try {
    const existingEmail = await UserModel.findOne({ email: req.body.email });
    const existingFirstName = await UserModel.findOne({
      firstName: req.body.firstName,
    });
    const existingLastName = await UserModel.findOne({
      secondName: req.body.lastName,
    });
    if (existingEmail) {
      res.status(500).json({
        errorMessage: 'Email already in use. Pick another email, please!',
      });
      return;
    }
    if (existingFirstName && existingLastName) {
      res.status(500).json({
        errorMessage:
          'User under the entered first-name and second-name already registered. Pick other names, please!',
      });
      return;
    }
    if (!existingEmail && !existingFirstName && !existingLastName) {
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
    const existingUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (!existingUser) {
      res.status(401).json({
        errorMessage: 'Either the entered email or password is incorrect!',
      });
      return;
    }
    if (existingUser) {
      const isPasswordCorrect = await verifyPassword(
        req.body.password,
        existingUser.password
      );
      if (isPasswordCorrect) {
        const token = generateToken(existingUser._id);
        if (!token) {
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
              lastName: existingUser.lastName,
              profileImage: existingUser.profileImage,
              age: existingUser.age || 'confidential',
              maritalStatus: existingUser.maritalStatus || 'confidential',
            },
            token,
          });
        }
        return;
      }
      if (!isPasswordCorrect) {
        res.status(401).json({
          errorMessage: 'Either the entered email or password is incorrect!',
        });
      }
      return;
    }
  } catch (error) {
    res.status(404).json({
      errorMessage: 'Server error. User login failed. Try later, please!',
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        message: 'User profile succeccfully received!',
        user: {
          userID: req.user._id,
          email: req.user.email,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          profileImage: req.user.profileImage,
          age: req.user.age || 'confidential',
          maritalStatus: req.user.maritalStatus || 'confidential',
          favoriteBlogList: req.user.favoriteBlogList,
          profileImagePublicID: req.user.profileImagePublicID,
        },
      });
    }
  } catch (error) {
    res.status(500).json('Getting user profile failed!');
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json({ message: 'Users fetched!', users });
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
      await removeImageFromCloudinray(req.body.profileImagePublicID);
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
