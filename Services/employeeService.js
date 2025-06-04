const employeeRepository = require('Repositories/employeeRepository');
const { getDepartmentNameById } = require('Services/departmentService');
const ShiftServicese = require('Services/shiftService');

/**
 * Constructs a detailed employee object with department and shift summaries.
 *
 * @async
 * @function buildEmployeeWithDetails
 * @param {Object} emp - Employee object from the repository
 * @returns {Promise<Object>} A detailed employee object:
 *  {
 *    _id: ObjectId,
 *    fullName: String,
 *    department: { id: ObjectId, name: String } | null,
 *    shifts: Array<{ shiftId: ObjectId, date: Date, startingHour: Number, endingHour: Number }>
 *  }
 */
const buildEmployeeWithDetails = async (emp) => {
  let department = null;
  if (emp.DepartmentID) {
    const departmentName = await getDepartmentNameById(emp.DepartmentID);
    department = {
      id: emp.DepartmentID,
      name: departmentName
    };
  }

  const shifts = await ShiftServicese.getShiftsByIdUser(emp._id);
  const fullName = `${emp.FirstName} ${emp.LastName}`;
  return {
    _id: emp._id,
    fullName,
    department,
    shifts
  };
};

const getEmployeesWithDetails = async () => {
  const employees = await employeeRepository.getAllEmployee();
  return await Promise.all(employees.map(buildEmployeeWithDetails));
};

const getEmployeesByDepartmentWithDetails = async () => {
  const employees = await employeeRepository.getEmployeesByDepartment();
  return await Promise.all(employees.map(buildEmployeeWithDetails));
};

const getEmployeesFullNamesByDepartment = async (departmentId) => {
  const employees = await employeeRepository.getEmployeesByDepartment(departmentId);
  return employees.map((emp) => ({
    _id: emp._id,
    fullName: `${emp.FirstName} ${emp.LastName}`
  }));
};

const addEmployee = (obj) => {
  return employeeRepository.addEmployee(obj);
};

const updateEmployee = (id, obj) => {
  return employeeRepository.updateEmployee(id, obj);
};

const deleteEmployeesByDepartmentId = async (departmentId) => {
  return employeeRepository.deleteMany({ DepartmentID: departmentId });
};

const deleteEmployee = async (id) => {
  await ShiftServicese.removeEmployeeFromAllShifts(id);
  return employeeRepository.deleteEmployee(id);
};

const getEmployeeById = (id) => {
  return employeeRepository.getEmployeeById(id);
};

module.exports = {
  getEmployeesWithDetails,
  getEmployeesByDepartmentWithDetails,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  deleteEmployeesByDepartmentId,
  getEmployeeById,
  getEmployeesFullNamesByDepartment
};
