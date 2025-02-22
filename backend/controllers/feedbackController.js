const Feedback = require('../models/FeedbackModel');
const Ride = require('../models/RideModel');

// Submit feedback
const submitFeedback = async (req, res) => {
  const { rideId, receiverId, rating, comment } = req.body;

  try {
    const feedback = new Feedback({
      ride: rideId,
      giver: req.user.id,
      receiver: receiverId,
      rating,
      comment,
    });

    await feedback.save();

    // Update ride with feedback reference
    const ride = await Ride.findById(rideId);
    ride.feedback.push(feedback._id);
    await ride.save();

    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get feedback for a ride
const getFeedback = async (req, res) => {
  const { rideId } = req.params;

  try {
    const feedback = await Feedback.find({ ride: rideId });

    if (!feedback) {
      return res.status(404).json({ message: 'No feedback found for this ride' });
    }

    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitFeedback, getFeedback };









// const feedbacks = [];

// const submitFeedback = async (req, res) => {
//   const { comments, rating } = req.body;
//   try {
//     const feedback = { id: Date.now(), comments, rating };
//     feedbacks.push(feedback);
//     res.status(201).json({ message: 'Feedback submitted', feedback });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getFeedback = async (req, res) => {
//   try {
//     res.json({ feedbacks });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getFeedbackCount = async (req, res) => {
//   try {
//     res.json({ feedbackCount: feedbacks.length });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { submitFeedback, getFeedback, getFeedbackCount };
