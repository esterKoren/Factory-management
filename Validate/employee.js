const Joi = require('joi');
// פונקצית ולדציה עובד
const EmployeeValidate = (employee) => {
    const schema = Joi.object({
      
        FirstName: Joi.string().min(5).max(25).required(),
        StartWorkYear:Joi.number().min(1990).max(2025).require(),
        DepartmentID:Joi.string().required()

    });
  
    return schema.validate(employee);
  };
  
  module.exports = { EmployeeValidate };