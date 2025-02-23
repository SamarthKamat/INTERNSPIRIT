const express = require('express');
const { register, login, autoLogin } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware') // 

router.post('/register', register);
router.post('/login', login);
router.get('/auto-login', authMiddleware, autoLogin);

module.exports = router;
