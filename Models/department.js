
const mongoose = require('mongoose');
const Joi = require('joi');

// יצירת סכמה מחלקה
const departmentSchema = mongoose.Schema({
  
  Name: { type: String, required: true,min:5,max:30 },//Department name
  Manager: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },//Department Manager
});

// יצירת מודל מחלקות
const departmentModel = mongoose.model('department', departmentSchema);



module.exports = { departmentModel};