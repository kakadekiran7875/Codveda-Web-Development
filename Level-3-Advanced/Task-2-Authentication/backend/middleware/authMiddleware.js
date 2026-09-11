const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getDBStatus } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'codveda_super_secret_jwt_key_2026';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      if (getDBStatus()) {
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
          return res.status(401).json({ success: false, message: 'User belonging to token no longer exists.' });
        }
      } else {
        // Fallback in-memory user verification
        const { getLocalUserById } = require('../controllers/authController');
        const localUser = getLocalUserById(decoded.id);
        if (!localUser) {
          return res.status(401).json({ success: false, message: 'User belonging to token not found.' });
        }
        const { password, ...userWithoutPass } = localUser;
        req.user = userWithoutPass;
      }

      next();
    } catch (error) {
      console.error('[Auth Middleware] Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired.'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no Bearer token provided in Authorization header.'
    });
  }
};

module.exports = { protect, JWT_SECRET };
