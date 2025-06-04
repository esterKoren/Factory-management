// פונקצית ולדציה משתמש
const userValidate = (user) => {
  const schema = Joi.object({
    
    FullName: Joi.string().min(5).max(30).required(),
    NumOfActions: Joi.number().min(5).max(20).required(),
  });

  return schema.validate(user);
};

module.exports = {  userValidate };