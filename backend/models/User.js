const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ek email se ek hi account banega
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // timestamps true karne se createdAt aur updatedAt apne aap add ho jayenge

module.exports = mongoose.model('User', userSchema);