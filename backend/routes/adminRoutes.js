const express = require('express');
const { getAllUsers, getAllRides } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.get('/rides', authMiddleware, adminMiddleware, getAllRides);

module.exports = router;
