const Booking = require('../models/BookingModel');
const Ride = require('../models/RideModel');

// Request a ride with pickup location
const requestRide = async (req, res) => {
  const { rideId, pickupLocation } = req.body;

  try {
    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    const booking = new Booking({
      ride: rideId,
      passenger: req.user.id,
      driver: ride.driver,
      pickupLocation, // Add pickup location
      status: 'Pending',
    });

    await booking.save();

    res.status(201).json({ message: 'Ride request submitted', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Accept ride request with pickup location
const acceptRideRequest = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.driver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    booking.status = 'Accepted';
    await booking.save();

    const ride = await Ride.findById(booking.ride);
    ride.passengers.push(booking.passenger);
    await ride.save();

    res.status(200).json({ message: 'Ride request accepted', booking, ride });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Cancel ride request
const cancelRideRequest = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.driver.toString() !== req.user.id && booking.passenger.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    booking.status = 'Rejected';
    await booking.save();

    res.status(200).json({ message: 'Ride request canceled', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { requestRide, acceptRideRequest, cancelRideRequest };











// let bookings = [];

// const createBooking = async (req, res) => {
//   const { rideId, userId } = req.body;
//   try {
//     const booking = { id: Date.now(), rideId, userId };
//     bookings.push(booking);
//     res.status(201).json({ message: 'Booking created', booking });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const listBookings = async (req, res) => {
//   try {
//     const bookingCount = bookings.length;
//     res.json({ bookingCount });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { createBooking, listBookings };