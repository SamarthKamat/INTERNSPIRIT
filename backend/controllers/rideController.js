let rides = [];

const create = async (req, res) => {
  const { origin, destination, date, time, seats } = req.body;
  const userId = req.user.userId;
  try {
    const ride = { id: Date.now(), origin, destination, date, time, seats, userId };
    rides.push(ride);
    res.status(201).json({ message: 'Ride created', ride });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const list = async (req, res) => {
  try {
    res.json({ rides });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { create, list };
