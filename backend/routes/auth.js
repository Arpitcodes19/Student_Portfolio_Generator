const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Humara banaya hua User model

// 1. SIGN UP ROUTE (Naya account banane ke liye)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check karein ki user pehle se toh nahi hai
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Password ko secure (hash) karein
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naya user banayein aur database mein save karein
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // User ke liye ek JWT (JSON Web Token) banayein
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, message: "User registered successfully!", name: user.name });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// 2. LOGIN ROUTE (Account login karne ke liye)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email database mein dhundein
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Password match karein (hashed password ko plain password se compare karein)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Password sahi hai toh naya Token banayein
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token, message: "Logged in successfully!", name: user.name });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
