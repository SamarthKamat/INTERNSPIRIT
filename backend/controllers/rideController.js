const Ride = require('../models/RideModel'); // Import your Ride model
const User = require('../models/UserModel'); // Import your User model (if needed for driver details)
const Car = require('../models/CarModel'); // Import your Car model (if needed for car details)
const mongoose = require('mongoose')

// Create a new ride
const createRide = async (req, res) => {
  const { startLocation, endLocation, startTime, price, carId } = req.body;

  console.log(req.body)
  try {
    if (!mongoose.Types.ObjectId.isValid(carId)) { 
      return res.status(400).json({ message: 'Invalid carId' });
    }

    const newRide = new Ride({
      driver: req.user.id,
      car: carId, // Now carId is guaranteed to be a valid ObjectId
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
    const rides = await Ride.find({ $or: [{ driver: req.user._id }, { passengers: req.user._id }] });
    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getRideDetails = async (req, res) => {
  try {
    const rideId = req.params.id;

    const ride = await Ride.findById(rideId)
      .populate('driver', 'firstName lastName phone rating') 
      .populate('car', 'make model year licensePlate') 

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.json(ride);

    // Option 2: Manual population (if populate is not working or you prefer this approach)
    // const ride = await Ride.findById(rideId);
    // if (!ride) {
    //   return res.status(404).json({ message: 'Ride not found' });
    // }

    // if (ride.driver) {
    //   const driver = await User.findById(ride.driver);
    //   ride.driver = { // Create a new object to avoid modifying the original Mongoose document
    //     firstName: driver.firstName,
    //     lastName: driver.lastName,
    //     phone: driver.phone,
    //     rating: driver.rating,
    //     // ... other driver fields
    //   };
    // }

    // if (ride.car) {
    //   const car = await Car.findById(ride.car);
    //   ride.car = {
    //     make: car.make,
    //     model: car.model,
    //     year: car.year,
    //     licensePlate: car.licensePlate,
    //     image: car.image,
    //     // ... other car fields
    //   };
    // }

    // res.json(ride);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createRide, getUserRides, getRideDetails };


