const express = require('express');
const { create, list } = require('../controllers/rideController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, create);
router.get('/', list);

module.exports = router;
