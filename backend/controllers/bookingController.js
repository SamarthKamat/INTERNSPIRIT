let bookings = [];

const createBooking = async (req, res) => {
  const { rideId, userId } = req.body;
  try {
    const booking = { id: Date.now(), rideId, userId };
    bookings.push(booking);
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const listBookings = async (req, res) => {
  try {
    const bookingCount = bookings.length;
    res.json({ bookingCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBooking, listBookings };
