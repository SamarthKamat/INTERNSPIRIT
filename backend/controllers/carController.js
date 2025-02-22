const Car = require('../models/CarModel');
const User = require('../models/UserModel');

// Add a new car
const addCar = async (req, res) => {
  const { make, model, year, licensePlate } = req.body;

  try {
    const newCar = new Car({
      make,
      model,
      year,
      licensePlate,
      owner: req.user.id,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get logged-in user's cars
const getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user.id });
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get any user's cars (for admin or specific authorized roles)
const getCarsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const cars = await Car.find({ owner: userId });
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addCar, getUserCars, getCarsByUserId };
