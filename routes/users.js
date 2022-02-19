const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//login page
router.get('/login',(req,res)=>{
       res.render('login');
})
//register page
router.get('/register',(req,res)=>{
    res.render('register');
})

//register post
router.post('/register',(req,res)=>{
    const {name,email,password,cpassword} = req.body;
  //  validation
    let errors=[];
    if(!name || !email || !password || !cpassword){
        errors.push({msg:"please fill all the fileds"})
    }
    if(password!==cpassword){
        errors.push({msg:"passwords didnt match"})
    }
    if(password.length<6){
        errors.push({msg:"passwords should be at least 6 characters"})
    }
    //check for errors
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            cpassword
        })
    }
    else{
        //if everything is correct
        User.findOne({email:email})
        .then(function(user){
            if(user){
                errors.push({msg:"Email already registered"})
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    cpassword
                })
            }
            else{
                   //   hash password
                   const salt = bcrypt.genSaltSync(10);
                   const hash= bcrypt.hashSync(password,salt);
                const newUser= new User({
                    name,
                    email,
                    password:hash
                })
             
               
               
                  
                
                
                newUser.save().then(()=>{
                    console.log('saved')
                })
                .catch(err=>{console.log(err)})
                errors=[{msg:"registration successful, please login"}]
               res.render('login',{errors});
            }

        })
      
    }
  
})

//login route
router.post('/login',function(req, res, next) {
    console.log(req.body);
    next()
}, 
passport.authenticate('local', { failureRedirect: '/users/login', successRedirect: '/dashboard' }),
 (err, req, res, next) => {
    if (err) next(err);
    console.log(req.body)
   
});
//protected route
router.get('/protected-route', (req, res, next) => {
    console.log(req.session);
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1>');
    } else {
        res.send('<h1>You are not authenticated</h1>');
    }
});

//logout handle
router.get('/logout',(req,res)=>{
    req.logout();
    let errors=[{msg:"you logged out!"}];
    res.render('login',{errors})
})
module.exports =router;