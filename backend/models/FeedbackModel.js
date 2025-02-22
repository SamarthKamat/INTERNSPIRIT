const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  ride: { type: Schema.Types.ObjectId, ref: 'Ride', required: true },
  giver: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user giving the feedback
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user receiving the feedback
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;
