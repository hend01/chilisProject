const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const multer = require("multer"); 
const authenticate= require("../middleware/RoleMiddelware")
filename="";
const Item=require('../models/item')
const mystorage= multer.diskStorage({
    destination:"./uploads",
    filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
  },
})
const upload= multer({storage:mystorage});
router.post('/add',authenticate,upload.any("image"),itemController.addItem);

router.get('/list',itemController.getItems);

module.exports=router; 