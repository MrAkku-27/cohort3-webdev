//JWT can be decoded by anyone using jwt.io


const  express = require('express');
const app= express();
const jwt = require('jsonwebtoken');
const JWT_SECRET="cssishardbhai";
app.use(express.json());

const users =[];


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
 const token = jwt.sign({
  username:founduser.username
 },JWT_SECRET);  //convert the username into token
//  sign(payload, secretKey);
// payload: This is the data object that you want to include in the JWT. It can contain any information you need to transmit.

// secretKey: This is a string used to sign the JWT. It should be kept secret and not exposed in your codebase. It's common practice to store it securely, such as in environment variables.
 res.json({
  message:"Signin Complete",
  user:founduser.username,
  token: token
 })
}else{
  res.status(404).json({
    message: "User not found"
  })
}
})
app.get("/me",function(req,res){
  const token = req.headers.token; //jwt
  const tokendecoded = jwt.verify(token,JWT_SECRET);
  const username=tokendecoded.username;
  const founduser = users.find(u=>u.username===username)
  if(founduser){
    res.json({
      user:founduser.username,
      password:founduser.password
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