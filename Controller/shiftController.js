const express=require('express');
const shiftService=require('Services/shiftService');
const shiftValidator=require('Validate/shift');
const router=express.Router();
router.get('/', async (req, res) => {
    try {
        const shifts = await shiftService.getShiftsWithDetails();
        res.status(200).json(shifts);
    } catch (error) {
        console.error('Error fetching shifts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/id',async(req,res)=>{
    const {id}=req.params;
    try {
        if (!Mongoose.isValidObjectId(id)) {
            return res.status(400).json({ type: "no valid id", massage: "id not in right format" });
        }
        const shifts = await shiftService.getShiftsByIdUser(id);
        if (!shifts || shifts.length === 0) {
            return res.status(404).json({ message: 'No shifts found for this employee' });
        }
        res.status(200).json(shifts);
    } catch (error) {
        console.error('Error fetching shifts by employee ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/',async(req,res)=>{
    const {erorr}= shiftValidator.shiftValidate(req.body);
    if(erorr){
        return res.status(400).json({type:'invalid data',massage:erorr.details[0].message});
    }
    try{
        const newShift=await shiftService.
    }
})