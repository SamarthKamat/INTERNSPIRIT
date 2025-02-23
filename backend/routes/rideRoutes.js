const express = require('express');
const { createRide, getUserRides, getRideDetails } = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createRide);
router.get('/myrides', authMiddleware, getUserRides);
router.get('/ride-details/:id', authMiddleware, getRideDetails);

module.exports = router;
