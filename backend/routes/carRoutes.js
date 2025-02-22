const express = require('express');
const { addCar, getUserCars, getCarsByUserId } = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, addCar);
router.get('/mycars', authMiddleware, getUserCars);
router.get('/user/:userId/cars', authMiddleware, getCarsByUserId);

module.exports = router;
