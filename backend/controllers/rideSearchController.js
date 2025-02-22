const Ride = require('../models/RideModel');

// Search for rides with more advanced filtering
const searchRides = async (req, res) => {
  const { startLocation, endLocation } = req.query;

  try {
    const query = {};

    if (startLocation) {
      query.startLocation = { $regex: startLocation, $options: 'i' };
    }

    if (endLocation) {
      query.endLocation = { $regex: endLocation, $options: 'i' };
    }

    // Additional filtering logic can be added here

    const rides = await Ride.find(query).populate('driver passengers car');

    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { searchRides };
