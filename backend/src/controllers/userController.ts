import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';

import User from '../models/userModel';

//@desc AUTH USER AND GET TOKEN
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or password');
  }
});

//@desc CREATE USER
//@route GET /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User Already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

//@desc GET USER PROFILE
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('User Not Found');
  }
});

//@desc UPDATE USER PROFILE
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log('req.user:', req.user);

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('User Not Found');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public

const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out Succeesfully' });
};

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  logoutUser,
};
