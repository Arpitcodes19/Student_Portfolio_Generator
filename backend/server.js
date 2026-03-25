const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes import kar rahe hain
const authRoutes = require('./routes/auth'); 
const portfolioRoutes = require('./routes/portfolio');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error: ', err));

// API Routes yahan define karein
app.use('/api/auth', authRoutes); // Ab /api/auth par saari login/signup requests jayengi
app.use('/api/portfolio', portfolioRoutes);
// Basic Test Route
app.get('/', (req, res) => {
  res.send('Portfolio Builder Backend is Running! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});