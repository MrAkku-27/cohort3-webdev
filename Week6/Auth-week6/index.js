const express = require('express');
const JWT = require('jsonwebtoken');
const app= express();
const JWT_SECRET ="idonthaveanysecretbro";

app.use(express.json());
const users =[];
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


app.get("/me",function(req,res){
  const token = req.headers.token;
  const verifytoken = JWT.verify(token,JWT_SECRET);
  const username = verifytoken.username;
  const existinguser = users.find(u=>u.username===username)

  if(existinguser){
    res.status(200).json({
      user :username,
      password: existinguser.password
    })
  }

})

app.listen(3000);