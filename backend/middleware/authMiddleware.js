const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Import your User model
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => { // Make it async
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.id; 

    const user = await User.findById(userId);

    if (!user) { 
        return res.status(401).json({message: "User not found."});
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') { // Check for specific error
      return res.status(401).json({ message: 'Token expired' }); // Send specific error
    }
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' }); // Other token errors
  }
};

module.exports = authMiddleware;