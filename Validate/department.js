const Joi = require('joi');
// פונקצית ולדציה מחלקה
const DepartmentValidate = (department) => {
    const schema = Joi.object({
      
      Name: Joi.string().min(5).max(30).required(),//Department name
      Manager:  Joi.string().required()//Department Manager
    });
  
    return schema.validate(deparment);
  };
  
  module.exports = { departmentValidate };