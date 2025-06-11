const Joi = require('joi');

// This function validates a department object using Joi.
const DepartmentValidate = (department, isUpdate = false) => {
  const baseSchema = {
    Name: Joi.string().min(5).max(30),
    Manager: Joi.string()
  };

  const schema = Joi.object(
    isUpdate
      ? baseSchema // אם זה עדכון - לא דורשים שדות חובה
      : {
          ...baseSchema,
          Name: baseSchema.Name.required(),
          Manager: baseSchema.Manager.required()
        }
  );

  return schema.validate(department);
};

module.exports = { DepartmentValidate };
// This module exports a validation function for departments using Joi.
