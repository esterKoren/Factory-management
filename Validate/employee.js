const Joi = require('joi');

// פונקציית ולידציה לעובד חדש או לעדכון עובד קיים
const EmployeeValidate = (employee, isUpdate = false) => {
  const baseSchema = {
    FirstName: Joi.string().min(5).max(25),
    StartWorkYear: Joi.number().min(1990).max(2025),
    DepartmentID: Joi.string()
  };

  const schema = isUpdate
    ? Joi.object(baseSchema) // בעדכון - כל השדות אופציונליים
    : Joi.object({           // ביצירה - כל השדות נדרשים
        FirstName: baseSchema.FirstName.required(),
        StartWorkYear: baseSchema.StartWorkYear.required(),
        DepartmentID: baseSchema.DepartmentID.required()
      });

  return schema.validate(employee);
};

module.exports = { EmployeeValidate };
