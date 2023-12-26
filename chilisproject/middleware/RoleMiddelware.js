const jwt = require('jsonwebtoken');

const User = require('../models/user');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token.' });
    }
  };
  
module.exports = authMiddleware;
