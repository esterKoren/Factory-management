
const { required } = require('joi');
const mongoose = require('mongoose');


// יצירת סכמה עובד
const employeeSchema = mongoose.Schema({
  
    FirstName: { type: String, required: true ,min: 2, max: 25 },
    LastName:{ type: String, required: true ,min: 2, max: 20 },
    StartWorkYear:{type:Number,required:true,min:1990,max:2025},////Year the employee started working at the factory
    DepartmentID:{ type: mongoose.Schema.Types.ObjectId, ref: 'department' },///Employee's department ID

  
});

// יצירת מודל עובדים
const employeeModel = mongoose.model('employee', departmentSchema);



module.exports = {employeeModel};