const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/authMiddleware');

// 1. POST: Portfolio Create ya Update karne ke liye
router.post('/', auth, async (req, res) => {
  try {
    const portfolioData = {
      ...req.body,
      user: req.user // Middleware se aayi hui User ID
    };

    // Agar user ka portfolio pehle se hai toh update karein, nahi toh naya banayein
    let portfolio = await Portfolio.findOneAndUpdate(
      { user: req.user },
      { $set: portfolioData },
      { new: true, upsert: true }
    );

    res.json({ message: "Portfolio saved successfully!", portfolio });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 2. GET: Logged-in user ka portfolio lene ke liye
router.get('/me', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;