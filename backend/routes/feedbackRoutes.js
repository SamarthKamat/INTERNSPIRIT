const express = require('express');
const { submitFeedback, getFeedback, getFeedbackCount } = require('../controllers/feedbackController');
const router = express.Router();

router.post('/', submitFeedback);
router.get('/', getFeedback);
router.get('/count', getFeedbackCount);

module.exports = router;
