const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new mongoose.Schema({
  
  
  title: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,    // required: true,
  },
 
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
  },

  image:{
    type:String
  },
 
 },
{
    timestamps:true
  
  
});

ItemSchema.pre('remove', function (next) {
  this.expirationDate = new Date();
  next();
});
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
