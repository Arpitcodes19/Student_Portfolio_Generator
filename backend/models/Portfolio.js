const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  // Yeh isliye taaki pata chale ki yeh portfolio kis user ka hai
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Design preference
  selectedTemplate: { type: String, default: 'minimal-pro' },
  
  // Personal Details
  fullName: { type: String, required: true },
  email: { type: String },
  location: { type: String },
  profileImage: { type: String }, // Base64 image data ke liye
  about: { type: String },
  
  // Professional Details
  experienceLevel: { type: String },
  company: { type: String },
  role: { type: String },
  duration: { type: String },
  
  // Education Details
  college: { type: String },
  degree: { type: String },
  graduationYear: { type: String },
  
  // Project Details
  projectTitle: { type: String },
  projectDesc: { type: String },
  projectLink: { type: String },
  
  // Skills & Socials
  skills: { type: [String] }, // Array of strings
  github: { type: String },
  linkedin: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);