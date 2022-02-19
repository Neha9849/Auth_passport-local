const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session= require('express-session');
const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User=require('./models/users');
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

const app=express();
const PORT = process.env.PORT || 5000;

//connect to db 
const db= require('./config/keys').MongoURI;
mongoose.connect(db,{useNewUrlParser: true})
.then(()=>{console.log('mongodb connected')})
.catch(err => console.log(err));

//passport Strategy
passport.use(
    new LocalStrategy({usernameField:'email' },(email,password,done)=>{
        //verifying the user
        User.findOne({email:email})
        .then(user=>{
            if(!user){
                console.log('email not found')
                return done(null,false)
            }
            else{
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err){
                        throw err;
                    }
                    if(isMatch){
                        console.log('Sucessfully logged in!')
                        return done(null,user)
                    }
                    else{
                        console.log('Invalid credentials')
                        return done(null,false)
                    }
                })
            }
           
        })
        .catch(err=>console.log(err))
    })
)
passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if (err) { return done(err); }
        done(null,user)
    })
})

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extented:true}));
app.use(expressLayouts);
app.set('view engine', 'ejs');
// app.use(express.cookieParser());
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    // store: sessionStore,
    cookie: {
        maxAge: 24*60*60*1000
    }
  }))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());





// app.use(express.json());


//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});
