const UserModel=require('Models/user');
// Get All
const getAllDataUser=()=>{
   return UserModel.find()
}
// Get By ID
const getUsertById = (id) => {
  return UserModel.findById(id);
};
//update
const updateEmployee=(id,obj)=>{
   return UserModel.findByIdAndUpdate(id,obj);
}
module.exports={getAllDataUser,getUsertById,updateEmployee}