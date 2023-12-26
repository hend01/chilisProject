const express = require('express');
const router = express.Router();
const userController = require('../controllers/adminController');
const {User}=require('../models/user');
const jwt = require('jsonwebtoken'); 
const service=require('../services/emailService')
const multer = require("multer"); 
filename="";



router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

  


module.exports = router;
