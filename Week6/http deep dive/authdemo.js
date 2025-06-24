const  express = require('express');
const app= express();
const crypto = require('crypto');
app.use(express.json());

const users =[];


function generatetoken(){
return crypto.randomBytes(16).toString('hex'); 
}
app.post("/signup",function (req,res){
  const rusername = req.body.username;
  const rpassword = req.body.password;
 
const founduser =  users.find(u=> u.username===rusername);

if(!founduser){
 users.push({
    username:rusername,
    password:rpassword
  });
  res.json({
    message:"Signup successfull"
  })
}else{
  res.json({
    message: "Username Already exists"
  })
}
})

app.post("/signin",function (req,res){
  const rusername = req.body.username;
  const rpassword = req.body.password;
 
const founduser =  users.find(u=> u.username===rusername && u.password===rpassword);

if(founduser){
 const token = generatetoken();
 founduser.token=token;
 res.json({
  message:"Signin Complete",
  user:founduser.username,
  token:founduser.token
 })
}else{
  res.status(404).json({
    message: "User not found"
  })
}
})
app.get("/me",function(req,res){
  const token = req.headers.token;
  const founduser = users.find(u=>u.token===token)
  if(founduser){
    res.json({
      user:founduser.username,
    })
  }else{
    res.status(404).json({
      message:"user not found"
    })
  }
})

app.get("/list",function(req,res){
  
  res.json(users.map((u)=> u.username));
})

app.listen(3000);