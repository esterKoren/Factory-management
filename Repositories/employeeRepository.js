const employeeModel=require('Models/employee');
//get All
const getAllEmployee=()=>{//
   return employeeModel.find()
}
// Get By ID
const getEmployeeById = (id) => {
  return employeeModel.findById(id);
};

// Get by department
const getEmployeesByDepartment = (departmentId) => {
  return employeeModel.find({ department: departmentId });
};

// Create
const addEmployee=(obj)=>{
    const employee= new employeeModel(obj);
    return employee.save()
}
//Delete
const deleteEmployee=(id)=>{
    return employeeModel.findByIdAndDelete(id);
}
//Delete
const deleteMany = async (filter) => {
  return employeeModel.deleteMany(filter);
};
//update
const updateEmployee=(id,Obj)=>{
    return employeeModel.findByIdAndUpdate(id,Obj,{new:true})
}

module.exports={getAllEmployee,getEmployeeById,getEmployeesByDepartment,deleteEmployee,deleteMany,updateEmployee,addEmployee}