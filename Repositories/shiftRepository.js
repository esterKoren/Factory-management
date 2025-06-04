const shiftModel = require('Models/shift');

// Get All
const getAllShift = () => {
  return shiftModel.find();
};

// Get By ID
const getShiftById = (id) => {
  return shiftModel.findById(id);
};

// Get by employee
const getShiftsByEmployeeId = (employeeId) => {
  return shiftModel.find({ WorkersOnShift: employeeId }).lean();
};

// Create
const addShift = (obj) => {
  const shift = new shiftModel(obj);
  return shift.save();
};

// Update
const updateShift = (id, obj) => {
  return shiftModel.findByIdAndUpdate(id, obj, { new: true });
};

// Delete by ID
const deleteShift = (id) => {
  return shiftModel.findByIdAndDelete(id);
};



// // Generic pull function
// const pullFromArrayField = (collectionModel, fieldName, valueToRemove) => {
//   return collectionModel.updateMany(
//     { [fieldName]: valueToRemove },
//     { $pull: { [fieldName]: valueToRemove } }
//   );
// };

module.exports = {
  getAllShift,
  getShiftById,
  getShiftsByEmployeeId,
  addShift,
  updateShift,
  deleteShift,
 
};
