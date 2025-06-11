const express= require('express');
const employeeService = require('Services/employeeService');
const employeeValidator = require('Validate/employee');
const router = express.Router();
router.get('/',async(req,res)=>{
    try{
        const employees=await employeeService.getEmployeesWithDetails();
        res.status(200).json(employees);    
    }
    catch(error){
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.get('/department/:departmentId',async(req,res)=>{
    try{
         const { departmentId } = req.params;
            if(!Mongoose.isValidObjectId(departmentId)){
             return res.status(400).json({ type: "no valid id", massage: "id  not in right format" });
                
            }
            const employees = await employeeService.getEmployeesFullNamesByDepartment(departmentId);
            if (!employees || employees.length === 0) {
                return res.status(404).json({ message: 'No employees found for this department' });
            }
            res.status(200).json(employees);
        }
            catch (error) {
                console.error('Error fetching employees by department:', error);
                res.status(500).json({ message: 'Internal server error' });
            }

          
    
    
})
router.get('/fullname/department/:departmentId', async (req, res) => {
    const { departmentId } = req.params;
    try {
        if (!Mongoose.isValidObjectId(departmentId)) {
            return res.status(400).json({ type: "no valid id", massage: "id not in right format" });
        }
        const employees = await employeeService.getEmployeesFullNamesByDepartment(departmentId);
        if (!employees || employees.length === 0) {
            return res.status(404).json({ message: 'No employees found for this department' });
        }
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees by department:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!Mongoose.isValidObjectId(id)) {
            return res.status(400).json({ type: "no valid id", massage: "id not in right format" });
        }
        const employee = await employeeService.getEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/', async (req, res) => {
    const { error } = employeeValidator.EmployeeValidate(req.body);
    if (error) {
        return res.status(400).json({ type: "invalid data", message: error.details[0].message });
    }
    try {
        const newEmployee = await employeeService.addEmployee(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!Mongoose.isValidObjectId(id)) {
        return res.status(400).json({ type: "no valid id", massage: "id not in right format" });
    }
    const { error } = employeeValidator.EmployeeValidate(req.body, true); // true = זה עדכון
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const updatedEmployee = await employeeService.updateEmployee(id, req.body);
        if (!updatedEmployee) {
            return res.status(404).json({ type: "not found", massage: "employee not found" });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.log('ERROR updating employee:', error);
        res.status(500).json({ massage: 'Internal server error' });
    }
});
router.delete('/department/:departmentId', async (req, res) => {
    const { departmentId } = req.params;
    if (!Mongoose.isValidObjectId(departmentId)) {
        return res.status(400).json({ type: "no valid id", massage: "id not in right format" });
    }
    try {
        const deleteResult = await employeeService.deleteEmployeesByDepartmentId(departmentId);
        res.status(200).json(deleteResult);
    } catch (error) {
        console.error('Error deleting employees by department:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!Mongoose.isValidObjectId(id)) {
        return res.status(400).json({ type: "no valid id", massage: "id not in right format" });
    }
    try {
        const deleteResult = await employeeService.deleteEmployee(id);
        if (!deleteResult) {
            return res.status(404).json({ type: "not found", massage: "employee not found" });
        }
        res.status(200).json(deleteResult);
    } catch (error) {
        console.log('Error deleting employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});