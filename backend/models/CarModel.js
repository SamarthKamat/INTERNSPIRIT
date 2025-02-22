const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  licensePlate: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
