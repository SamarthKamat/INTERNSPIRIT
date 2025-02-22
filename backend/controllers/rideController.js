const Ride = require('../models/RideModel');

// Create a new ride
const createRide = async (req, res) => {
  const { startLocation, endLocation, startTime, price, carId } = req.body;

  try {
    const newRide = new Ride({
      driver: req.user.id,
      car: carId,
      startLocation,
      endLocation,
      startTime,
      price,
    });

    await newRide.save();
    res.status(201).json(newRide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get rides for a user
const getUserRides = async (req, res) => {
  try {
    const rides = await Ride.find({ $or: [{ driver: req.user.id }, { passengers: req.user.id }] });
    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createRide, getUserRides };









// let rides = [];

// const create = async (req, res) => {
//   const { origin, destination, date, time, seats } = req.body;
//   const userId = req.user.userId;
//   try {
//     const ride = { id: Date.now(), origin, destination, date, time, seats, userId };
//     rides.push(ride);
//     res.status(201).json({ message: 'Ride created', ride });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const list = async (req, res) => {
//   try {
//     res.json({ rides });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { create, list };
