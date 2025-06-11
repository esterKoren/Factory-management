const express=require('express');
const usersServices=require('services/usersService');
const router=express.router();
router.get('/',async(req,res)=>{
try{
    const users=await usersServices.getUsersWithDetails();
    if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
    }
     res.status(200).json(users);
    
}
catch(erorr){
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
}
})

module.exports=router;