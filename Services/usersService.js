const employeeRepository = require("Repositories/employeeRepository");

/**
 * Retrieves all employees from the repository.
 *
 * @async
 * @function getAllEmployees
 * @returns {Promise<Array>} - A promise that resolves to an array of employee objects
 */
const getAllEmployees = async () => {
  return await employeeRepository.getAllEmployees();
};

/**
 * Retrieves a specific employee by their ID.
 *
 * @async
 * @function getEmployeeById
 * @param {string} id - The ID of the employee
 * @returns {Promise<Object|null>} - A promise that resolves to the employee object if found, otherwise null
 */
const getEmployeeById = async (id) => {
  return await employeeRepository.getEmployeeById(id);
};

/**
 * Updates the ActionsCount field for a specific employee.
 *
 * @async
 * @function updateActionsCount
 * @param {string} employeeId - The ID of the employee
 * @param {number} newCount - The new actions count value to be set
 * @returns {Promise<Object|null>} - A promise that resolves to the updated employee object or null if not found
 */
const updateActionsCount = async (employeeId, newCount) => {
  return await employeeRepository.updateEmployee(employeeId, {
    ActionsCount: newCount,
  });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  updateActionsCount,
};
