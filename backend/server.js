const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes import
const authRoutes = require('./routes/auth'); 
const portfolioRoutes = require('./routes/portfolio');

const app = express();

// ✅ CORS FIX: Allowing main domain and all Vercel previews
const allowedOrigins = [
  "https://student-portfolio-generator.vercel.app", // Main production link (No trailing slash)
  "http://localhost:5173",                         // Local development
  /\.vercel\.app$/                                 // Regex to allow all Vercel git/preview links
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) return allowed.test(origin);
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("CORS blocked this origin:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error: ', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Basic Test Route
app.get('/', (req, res) => {
  res.send('Portfolio Builder Backend is Running! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});