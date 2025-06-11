const express=require('express');
const usersWsServices=require('Services/usersWsService');
const router=express.router();
router.get('/login',async(req,res)=>{
    try{
        if(!req.query.username || !req.query.email) {
            return res.status(400).json({ message: 'Username and email are required' });
        }
        const { username, email } = req.query;
        const user=await usersWsServices.loginUser(username,email);
        if(!user){
            return res.status(404).json({type:'UserNotFound', message: 'User not found'});
        }
    }
    catch(erorr){
        console.error('Error during user login:', erorr);
        return res.status(500).json({ message: 'Internal server error' });
    }
})