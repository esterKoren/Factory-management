// shiftService.js
const shiftRepository = require('Repositories/shiftRepository');
const employeeService = require('Services/employeeService');

/**
 * Constructs a detailed shift object with employee name.
 *
 * @async
 * @function buildShiftWithDetails
 * @param {Object} shift - Shift object from the repository
 * @returns {Promise<Object>} A detailed shift object:
 *  {
 *    _id: ObjectId,
 *    date: Date,
 *    startingHour: Number,
 *    endingHour: Number,
 *    workersOnShift: Array<{ id: ObjectId, fullName: String }>
 *  }
 */
const buildShiftWithDetails = async (shift) => {
  let workersOnShift = [];
  if (shift.WorkersOnShift && Array.isArray(shift.WorkersOnShift)) {
    workersOnShift = await Promise.all(
      shift.WorkersOnShift.map(async (employeeId) => {
        const emp = await employeeService.getEmployeeById(employeeId);
        return {
          id: emp._id,
          fullName: `${emp.FirstName} ${emp.LastName}`
        };
      })
    );
  }

  return {
    _id: shift._id,
    date: shift.Date,
    startingHour: shift.StartingHour,
    endingHour: shift.EndingHour,
    workersOnShift
  };
};

const getShiftsWithDetails = async () => {
  const shifts = await shiftRepository.getAllShift();
  return await Promise.all(shifts.map(buildShiftWithDetails));
};

const getShiftsByIdUser = async (employeeId) => {
  const shiftsByIdUser = await shiftRepository.getShiftsByEmployeeId(employeeId);
  return shiftsByIdUser.map(s => ({
    id: s._id,
    date: s.Date,
    startingHour: s.StartingHour,
    endingHour: s.EndingHour,
  }));
};

const addEmployeeToShift = async (shiftId, employeeId) => {
  const shift = await shiftRepository.getShiftById(shiftId);
  if (!shift.WorkersOnShift.includes(employeeId)) {
    shift.WorkersOnShift.push(employeeId);
    return shiftRepository.updateShift(shiftId, shift);
  }
  return shift;
};

const removeEmployeeFromShift = async (shiftId, employeeId) => {
  const shift = await shiftRepository.getShiftById(shiftId);
  shift.WorkersOnShift = shift.WorkersOnShift.filter(id => id !== employeeId);
  return shiftRepository.updateShift(shiftId, shift);
};

const removeEmployeeFromAllShifts = async (employeeId) => {
  const shifts = await shiftRepository.getShiftsByEmployeeId(employeeId);
  await Promise.all(
    shifts.map(shift => {
      shift.WorkersOnShift = shift.WorkersOnShift.filter(id => id !== employeeId);
      return shiftRepository.updateShift(shift._id, shift);
    })
  );
};

module.exports = {
  getShiftsWithDetails,
  getShiftsByIdUser,
  addEmployeeToShift,
  removeEmployeeFromShift,
  removeEmployeeFromAllShifts,
};
