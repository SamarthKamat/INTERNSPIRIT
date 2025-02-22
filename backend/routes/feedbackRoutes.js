const express = require('express');
const { submitFeedback, getFeedback } = require('../controllers/feedbackController'); 
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/submit', authMiddleware, submitFeedback);
router.get('/ride/:rideId', authMiddleware, getFeedback);

module.exports = router;
