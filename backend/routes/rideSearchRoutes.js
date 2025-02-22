const express = require('express');
const { searchRides } = require('../controllers/rideSearchController');
const router = express.Router();

router.get('/search', searchRides);

module.exports = router;
