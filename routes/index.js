const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('welcome');
})
//dashboard page
router.get('/dashboard',(req,res)=>{
    if(req.isAuthenticated()){
        console.log(req.user)
        res.render('dashboard',{
            user:req.user
        });
    }
    else{
        let errors=[{msg:"please login to view dashboard"}]
        res.render('login',{errors:errors});
    }
   
})
module.exports =router;



