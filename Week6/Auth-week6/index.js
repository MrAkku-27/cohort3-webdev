const express = require('express');
const JWT = require('jsonwebtoken');
const app= express();
const JWT_SECRET ="idonthaveanysecretbro";

app.use(express.json());
const users =[];
app.get("/",function(req,res){
  res.sendFile(__dirname+'/public/index.html');
})
app.post("/signup",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  const existinguser = users.find(u=>u.username===username)
  if(existinguser){
    res.json({
      message: "User Already Exist"
    })
  }else{
    users.push({
    username: username,
    password: password
    })
    res.json({
      message:"SignUp Succesful"
    })
  }
})

function auth(req,res,next){
  const token = req.headers.token;
  const usertoken=JWT.verify(token,JWT_SECRET);
  const username= usertoken.username;
  const existinguser = users.find(u=>u.username===username);
  if(existinguser){
    req.username = existinguser.username;
    req.password =existinguser.password;
    next() 
  }else{
    res.json({
      message:"User Doesnt Exist "
    })
  }
  
}

app.post("/signin",function(req,res){
  const username = req.body.username;
  const password = req.body.password;

 
  const existinguser = users.find(u=>u.username===username&&u.password===password)
  if(existinguser){
     const token = JWT.sign({
    username:username
  },JWT_SECRET);
    res.json({
      message: "SignIn Sucessful",
      username:username,
      token: token
    })
  }else{
    res.status(404).json({
      message:"User Not found"
    })
  }
})


app.get("/me",auth,function(req,res){

    res.status(200).json({
      user :req.username,
      password: req.password
    })


})

app.listen(3000);