const Admin = require('../models/Admin');

const adminMiddleware = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (admin) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminMiddleware;
