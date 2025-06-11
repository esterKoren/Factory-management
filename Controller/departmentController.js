const express = require('express');
const { Mongoose } = require('mongoose');
const departmentService = require('Services/departmentService');
const departmentValidator = require('validate/department');
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const departments = await departmentService.getDepartmentsWithDetails();
    res.status(200).json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const department = await departmentService.getDepartmentById(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/', async (req, res) => {
  const {error}= await departmentValidator.DepartmentValidate(req.body);
  if(error){
    return res.status(400).json({  type: "invalid data " ,message: error.details[0].message });
  }
  try {
    const newDepartment = await departmentService.addDepartment(req.body);
    res.status(201).json(newDepartment);
   
  }
    catch (error) {
        console.error('Error adding department:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}); 
router.put('/:id',async(req, res)=>{
    const {id}=req.params;
    if(!Mongoose.isValidObjectId(id)){
         res.status(400).json({ type: "no valid id", massage: "id  not in right format" });
    }
    const { error } = DepartmentValidate(req.body, true); // true = זה עדכון
    if (error) {
    return res.status(400).json({ message: error.details[0].message });
}

    try{
        const updateDepartment=await departmentService.updateDepartment(id,req.body);
        if(!updateDepartment){
             res.status(404).json({type:"not found",massage:"department not found"});
        }
        res.status(200).json(updateDepartment);

    }
    catch(error){
        console.log('ERORR updating department:',error);
        res.status(500).json({massage:'Internal server error'})
    }
})
router.delete('/:id',async(req,res)=>{
    const{id}=req.params;
    if(!Mongoose.isValidObjectId(id)){
        return res.status(400).json({ type:'no valid id', massage:"id not int right format"})
    }
    try{
        const deleteDepartment=await departmentService.deleteDepartment(id);
        if(!deleteDepartment){
            return res.status(404).json({type:"not fount",massage:"department not found"})
        }
        res.status(200).json(deleteDepartment)
    }
    catch(error){
        console.log('Erorr deleting department:',error);
        res.send(500).json({massage :"Internal server error"})
    }
})
module.exports=router;
// This code defines an Express.js router for managing departments in a system.