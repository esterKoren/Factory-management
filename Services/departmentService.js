const DepartmentRepository = require('Repositories/DepartmentRepository');
const employeeService = require('Services/employeeService');

/**
 * Constructs a detailed Department object with department name and shift summaries.
 *
 * @async
 * @function buildDepartmentWithDetails
 * @param {Object} department - Department object from the repository
 * @returns {Promise<Object>} A detailed Department object:
 *  {
 *    _id: ObjectId,
 *    name: String,
 *    manager: Object,
 *    employees: Array<{ empId: ObjectId, fullName: String }>
 *  }
 */
const buildDepartmentWithDetails = async (department) => {
  let manager = null;
  if (department.Manager) {
    manager = await employeeService.getEmployeeById(department.Manager);
  }

  const employees = await employeeService.getEmployeesFullNamesByDepartment(department._id);

  return {
    _id: department._id,
    name: department.Name,
    manager,
    employees
  };
};

/**
 * Retrieves all Departments with their department and shift summaries.
 *
 * @async
 * @function getDepartmentsWithDetails
 * @returns {Promise<Array<Object>>} Array of detailed Department objects
 */
const getDepartmentsWithDetails = async () => {
  const Departments = await DepartmentRepository.getAllDepartment();
  return await Promise.all(Departments.map(buildDepartmentWithDetails));
};

/**
 * Adds a new Department to the database.
 *
 * @param {Object} obj - New Department data
 * @returns {Promise<Object>} Created Department
 */
const addDepartment = (obj) => {
  return DepartmentRepository.addDepartment(obj);
};

/**
 * Updates an Department in the database.
 *
 * @param {string} id - Department ID
 * @param {Object} obj - Updated Department data
 * @returns {Promise<Object>} Updated Department
 */
const updateDepartment = (id, obj) => {
  return DepartmentRepository.updateDepartment(id, obj);
};

/**
 * Deletes a Department and its associated employees from the database.
 *
 * @param {string} id - Department ID
 * @returns {Promise<Object>} Deleted Department
 */
const deleteDepartment = async (id) => {
  await employeeService.deleteEmployeesByDepartmentId(id); // מחיקת כל העובדים במחלקה
  return DepartmentRepository.deleteDepartment(id);
};

/**
 * Gets an Department by ID.
 *
 * @param {string} id - Department ID
 * @returns {Promise<Object>} Department
 */
const getDepartmentById = (id) => {
  return DepartmentRepository.getDepartmentById(id);
};

module.exports = {
  getDepartmentsWithDetails,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentById
};
