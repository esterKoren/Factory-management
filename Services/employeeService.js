const employeeRepository = require('Repositories/employeeRepository');
const { getDepartmentNameById } = require('Services/departmentService');
const ShiftServicese = require('Services/shiftService');

/**
 * Constructs a detailed employee object with department and shift summaries.
 *
 * @async
 * @function buildEmployeeWithDetails
 * @param {Object} emp - Employee object from the repository
 * @returns {Promise<Object>} A detailed employee object
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

/**
 * Retrieves all employees with department and shift details.
 *
 * @async
 * @function getEmployeesWithDetails
 * @returns {Promise<Array<Object>>} Array of detailed employee objects
 */
const getEmployeesWithDetails = async () => {
  const employees = await employeeRepository.getAllEmployee();
  return await Promise.all(employees.map(buildEmployeeWithDetails));
};

/**
 * Retrieves employees by department with department and shift details.
 *
 * @async
 * @function getEmployeesByDepartmentWithDetails
 * @returns {Promise<Array<Object>>} Array of detailed employee objects
 */
const getEmployeesByDepartmentWithDetails = async () => {
  const employees = await employeeRepository.getEmployeesByDepartment();
  return await Promise.all(employees.map(buildEmployeeWithDetails));
};

/**
 * Retrieves employees' full names by department ID.
 *
 * @async
 * @function getEmployeesFullNamesByDepartment
 * @param {string} departmentId - The department ID
 * @returns {Promise<Array<{ _id: string, fullName: string }>>}
 */
const getEmployeesFullNamesByDepartment = async (departmentId) => {
  const employees = await employeeRepository.getEmployeesByDepartment(departmentId);
  return employees.map((emp) => ({
    _id: emp._id,
    fullName: `${emp.FirstName} ${emp.LastName}`
  }));
};

/**
 * Adds a new employee.
 *
 * @function addEmployee
 * @param {Object} obj - Employee object
 * @returns {Promise<Object>} Created employee
 */
const addEmployee = (obj) => {
  return employeeRepository.addEmployee(obj);
};

/**
 * Updates an existing employee by ID.
 *
 * @function updateEmployee
 * @param {string} id - Employee ID
 * @param {Object} obj - Updated employee data
 * @returns {Promise<Object>} Updated employee
 */
const updateEmployee = (id, obj) => {
  return employeeRepository.updateEmployee(id, obj);
};

/**
 * Deletes all employees under a specific department.
 *
 * @async
 * @function deleteEmployeesByDepartmentId
 * @param {string} departmentId - Department ID
 * @returns {Promise<Object>} Delete result
 */
const deleteEmployeesByDepartmentId = async (departmentId) => {
  return employeeRepository.deleteMany({ DepartmentID: departmentId });
};

/**
 * Deletes a specific employee and removes them from all shifts.
 *
 * @async
 * @function deleteEmployee
 * @param {string} id - Employee ID
 * @returns {Promise<Object>} Delete result
 */
const deleteEmployee = async (id) => {
  await ShiftServicese.removeEmployeeFromAllShifts(id);
  return employeeRepository.deleteEmployee(id);
};

/**
 * Retrieves an employee by ID.
 *
 * @function getEmployeeById
 * @param {string} id - Employee ID
 * @returns {Promise<Object>} Employee object
 */
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
