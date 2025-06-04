const Joi = require('joi');
// פונקצית ולדציה משמרת
const ShiftValidate = (shift) => {
    const schema = Joi.object({
        Date:Joi.date().required(),
        StartingHour: Joi.number(),
        EndingHour:Joi.number(),
        WorkersOnShift:[Joi.string()]
       

    });
  
    return schema.validate(shift);
  };
  
  module.exports = { ShiftValidate };