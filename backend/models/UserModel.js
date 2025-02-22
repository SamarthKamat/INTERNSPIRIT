const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  bio: { type: String },
  rating: { type: Number, default: 0 },
  rides: [{ type: Schema.Types.ObjectId, ref: 'Ride' }],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
