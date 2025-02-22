const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RideSchema = new Schema({
  driver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  passengers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  status: { type: String, enum: ['Scheduled', 'In Progress', 'Completed', 'Canceled'], default: 'Scheduled' },
  price: { type: Number, required: true },
  feedback: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }], // Add feedback reference
});

const Ride = mongoose.model('Ride', RideSchema);
module.exports = Ride;
