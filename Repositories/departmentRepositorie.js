const departmentModel=require('Models/department');
//get All
const getAllDepartment=()=>{//
   return departmentModel.find()
}
// Get By ID
const getDepartmentById = (id) => {
  return departmentModel.findById(id);
};


// Create
const addDepartment=(obj)=>{
    const department= new departmentModel(obj);
    return department.save()
}
//Delete
const deleteDepartmewnt=(id)=>{
    return departmentModel.findByIdAndDelete(id);
}
//update
const updateDepartment=(id,Obj)=>{
    return departmentModel.findByIdAndUpdate(id,Obj,{new:true})
}

module.exports={getAllDepartment,getDepartmentById,deleteDepartmewnt,updateDepartment,addDepartment}