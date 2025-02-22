const express = require('express');
const { requestRide, acceptRideRequest, cancelRideRequest } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/request', authMiddleware, requestRide);
router.post('/accept', authMiddleware, acceptRideRequest);
router.post('/cancel', authMiddleware, cancelRideRequest);

module.exports = router;
