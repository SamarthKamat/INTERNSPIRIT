const express = require('express');
const { createBooking, listBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/', authMiddleware, listBookings);

module.exports = router;
