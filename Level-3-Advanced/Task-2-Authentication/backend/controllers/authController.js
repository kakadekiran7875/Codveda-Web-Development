const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getDBStatus } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'codveda_super_secret_jwt_key_2026';

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '7d'
  });
};

// In-Memory User Registry for zero-config fallback
let localUsers = [
  {
    _id: 'user_1',
    name: 'Kiran Kakade',
    email: 'kiran@codveda.com',
    password: bcrypt.hashSync('Codveda2026!', 10),
    role: 'developer',
    bio: 'Codveda Web Development Intern specializing in MERN architectures.',
    skills: ['React', 'Node.js', 'Express', 'JWT', 'MongoDB'],
    createdAt: new Date().toISOString()
  }
];

const getLocalUserById = (id) => localUsers.find(u => u._id === id);

// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    if (getDBStatus()) {
      // Check if user already exists
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.'
        });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role: role || 'intern',
        bio: bio || 'Web Development Intern'
      });

      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'Account registered successfully!',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bio: user.bio,
          skills: user.skills
        }
      });
    }

    // Local Fallback
    const existing = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: `user_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'intern',
      bio: bio || 'Web Development Intern',
      skills: ['React', 'Node.js', 'Express', 'JWT'],
      createdAt: new Date().toISOString()
    };

    localUsers.push(newUser);
    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        bio: newUser.bio,
        skills: newUser.skills
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    if (getDBStatus()) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'Authenticated successfully!',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          bio: user.bio,
          skills: user.skills
        }
      });
    }

    // Local Fallback
    const user = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Authenticated successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        skills: user.skills
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile (Protected)
// @route   GET /api/auth/profile
exports.getUserProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};

// @desc    Update current user profile (Protected)
// @route   PUT /api/auth/profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, bio, role, skills } = req.body;

    if (getDBStatus()) {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.role = role || user.role;
      if (skills) {
        user.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
      }

      const updatedUser = await user.save();

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          bio: updatedUser.bio,
          skills: updatedUser.skills
        }
      });
    }

    // Local Fallback
    const user = localUsers.find(u => u._id === req.user.id || u._id === req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.role = role || user.role;
    if (skills) {
      user.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
    }

    const { password, ...userProfile } = user;

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: userProfile
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getLocalUserById = getLocalUserById;
