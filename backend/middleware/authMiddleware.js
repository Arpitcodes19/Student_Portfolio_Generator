const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Header se token nikaalein
  const token = req.header('x-auth-token');

  // Check karein agar token nahi hai
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Token verify karein
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // User ID ko request object mein daal dein
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};