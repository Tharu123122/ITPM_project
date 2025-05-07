import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role, ...otherFields } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    email,
    password,
    role,
    ...otherFields,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      // Include role-specific fields
      ...(user.role === 'vendor' && {
        businessType: user.businessType,
        registrationNumber: user.registrationNumber,
        establishedYear: user.establishedYear,
        openingHours: user.openingHours,
        isConnected: user.isConnected,
      }),
      ...(user.role === 'driver' && {
        licenseNumber: user.licenseNumber,
        vehicleLicenseNumber: user.vehicleLicenseNumber,
        nicNumber: user.nicNumber,
        vehicleType: user.vehicleType,
      }),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Update role-specific fields
    if (user.role === 'vendor') {
      user.businessType = req.body.businessType || user.businessType;
      user.registrationNumber = req.body.registrationNumber || user.registrationNumber;
      user.establishedYear = req.body.establishedYear || user.establishedYear;
      user.openingHours = req.body.openingHours || user.openingHours;
      user.isConnected = req.body.isConnected ?? user.isConnected;
    } else if (user.role === 'driver') {
      user.licenseNumber = req.body.licenseNumber || user.licenseNumber;
      user.vehicleLicenseNumber = req.body.vehicleLicenseNumber || user.vehicleLicenseNumber;
      user.nicNumber = req.body.nicNumber || user.nicNumber;
      user.vehicleType = req.body.vehicleType || user.vehicleType;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
};