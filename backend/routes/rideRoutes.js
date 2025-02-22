const express = require('express');
const { createRide, getUserRides } = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createRide);
router.get('/myrides', authMiddleware, getUserRides);

module.exports = router;
