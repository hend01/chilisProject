const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const UserSchema = new Schema(
  {
    name: {
      type: String,
     // required: true
    },
 
    email: {
      type: String,
      //required: true,
      unique: true
    },

   
    role: {

      type: String,
      default: "user",
      required: true,
      enum: ["user", "admin"]
    },
   
     password: {
       type: String,
     //  required: true
    },
    
     newPassword:{
      type: String,
      required: false
  },
  isActive: {
    type: Boolean,
    default:false,
 },
  
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
    activationToken:{
      type: String,

    },

    },
    { timestamps: true }
  ); 
    
  
  let User = mongoose.model("user", UserSchema);

const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string(),
        name: Joi.string(),
        role: Joi.string(),
        


    });
    return schema.validate(user);
};



module.exports = { User, validate };