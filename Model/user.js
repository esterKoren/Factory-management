
const mongoose = require('mongoose');
const Joi = require('joi');

// יצירת סכמה משתמש
const userSchema = mongoose.Schema({
  
  FullName: { type: String, required: true ,min: 5, max: 30 },//
  NumOfActions: { type: Number, required: true, min: 5, max: 20 },//Number of actions the user is allowed to perform per day
});

// יצירת מודל משתמשים
const usersModel = mongoose.model('user', gradesSchema);



module.exports = { usersModel};