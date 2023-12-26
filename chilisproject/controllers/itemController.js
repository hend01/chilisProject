const Item = require("../models/item");
const {User} = require("../models/user");
const path = require("path");
const fs = require("fs");



const addItem = async (req, res) => {
    try {
      const adminId = req.user.userId;
  
      const newItem = new Item({
        price: req.body.price,
        title: req.body.title,
        admin: adminId,
        image: `/uploads/${req.files[0].filename}`,
  
      });
  
      const savedItem = await newItem.save();
  
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(500).json({ message: 'Coupon creation failed', error });
    }
  };
  const getItems =async (req, res) => {
    try {
      const coupons = await Item.find();
      res.status(200).json(coupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      res.status(500).json({ message: 'Error fetching items', error });
    }
  };
  module.exports = {addItem,getItems};
  