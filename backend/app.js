const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');
const carRoutes = require('./routes/carRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const rideSearchRoutes = require('./routes/rideSearchRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ride-search', rideSearchRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
