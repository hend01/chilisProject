const {User, validate} = require("../models/user");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService=require('../services/emailService');
const bcrypt = require('bcrypt');
const Item=require('../models/item')

const registerUser = async (req, res) => {
    try {
      const { name, email, role, password } = req.body;
    
    const { error } = validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({
        name,
        email,
        role,
        password: hashedPassword, 
      });
      await newUser.save();
  
     
       
      const generateActivationToken = (userId) => {
        const secretKey = 'your_activation_secret_key'; 
        const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); 
        return token;
      };
  
      const activationToken = generateActivationToken(newUser._id);
      newUser.activationToken = activationToken;
      await newUser.save();
  
      await emailService.sendActivationEmail(newUser.email, newUser.activationToken);
  
      return res.status(201).json({
        message: 'User registered successfully, An email has been sent to activate your account',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      if (!user.isActive) {
        return res.status(401).json({ message: 'Account is not active' });
      }
  
      const tokenPayload = {
        userId: user._id,
        role: user.role,
        name:user.name,
      };
  
      const token = jwt.sign(tokenPayload, 'your-secret-key', {
        expiresIn: '1h',
      });
      const response = {
        message: 'Login successful',
        token,
        user: {
          userId: user._id,
          role: user.role,
          name:user.name,
        },
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  module.exports = {
    registerUser,loginUser,
  };