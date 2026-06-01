
import express from 'express';
import User from '../models/user.js';
const router=express.Router();

router.post('/login', async (req,res)=>{
 const {username,password}=req.body;
 let user=await User.findOne({username});
 if(!user){ user=await User.create({username,password}); }
 else{ user.lastLogin=new Date(); await user.save(); }
 res.json({message:'ورود موفق یا ثبت‌نام انجام شد'});
});
export default router;
