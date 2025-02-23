const Ride = require('../models/RideModel');

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

    const rides = await Ride.find(query)
      .populate('driver', 'name phone rating') // Populate specific user fields
      .populate('car', 'make model year licensePlate') // Populate specific car fields
      .populate('passengers', 'name phone rating') // Populate specific passenger fields
      .populate('price', 'price')

    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { searchRides };











// const Ride = require('../models/RideModel');


// const searchRides = async (req, res) => {
//   const { startLocation, endLocation } = req.query;

//   try {
//     const query = {};

//     if (startLocation) {
//       query.startLocation = { $regex: startLocation, $options: 'i' };
//     }

//     if (endLocation) {
//       query.endLocation = { $regex: endLocation, $options: 'i' };
//     }

//     const rides = await Ride.find(query)
//       .populate('driver', 'firstName lastName phone rating') // Specify fields to populate
//       .populate('car', 'make model year') // Specify fields to populate
//       .populate('passengers'); // Populate passengers (if needed);

//     res.json(rides);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { searchRides };