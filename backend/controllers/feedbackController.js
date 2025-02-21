const feedbacks = [];

const submitFeedback = async (req, res) => {
  const { comments, rating } = req.body;
  try {
    const feedback = { id: Date.now(), comments, rating };
    feedbacks.push(feedback);
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFeedback = async (req, res) => {
  try {
    res.json({ feedbacks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFeedbackCount = async (req, res) => {
  try {
    res.json({ feedbackCount: feedbacks.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { submitFeedback, getFeedback, getFeedbackCount };
