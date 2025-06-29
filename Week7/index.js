const express = require('express');
const JWT = require('jsonwebtoken');
const app = express();
const mongoose =require('mongoose');
const {UserModel , TodoModel} =require('./db');
const JWT_SECRET ="ohmaturulub"
const bcrypt = require('bcrypt');
const {z} =require('zod');
app.use(express.json());
mongoose.connect("MONGODB_URL");



app.post("/signup",async function(req,res){
  const UserSchema = z.object({
  email:z.string().email(),
  name:z.string().min(4),
  password:z.string()
  // Min 8 chars
  .regex(/^.{8,100}$/, {
    message: "Password must be at least 8 characters long",
  })
  
  // At least one lowercase letter
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  
  // At least one uppercase letter
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  
  // At least one number
  .regex(/\d/, {
    message: "Password must contain at least one number",
  })
  
  // At least one special character
  .regex(/[!@#$%^&*]/, {
    message: "Password must contain at least one special character (!@#$%^&*)",})

})

const checkdata = UserSchema.safeParse(req.body);
if(!checkdata.success){
  res.json({
    error:checkdata.error.issues.map(e=>e.message)
  })
}else{
  const name =req.body.name;
  const password = req.body.password;
  const email = req.body.email;
try{
 const hashedpassword = await bcrypt.hash(password,5);
  await UserModel.create({
    email:email,
    name:name,
    password: hashedpassword
  })
  res.json({
    message:"User Signed Up"
  })

}catch(e){
  console.log(e);
  res.json({
    message:`${e}`
  })
}
}
 
})

app.post("/signin",async function(req,res){
  const email =req.body.email;
  const password = req.body.password;
  const user = await UserModel.findOne({
    email:email
  });
  if(!user){
    res.json({
      message: "This user doesnt exist"
    });
    return;
  }

  const match = await bcrypt.compare(password,user.password);
  if(match){
    const token = JWT.sign({
      id:user._id,
    },JWT_SECRET);
    res.json({
      token: token
    })
  }else{
    res.json({
      message:"Incorrect  Credentials"
    })

  }
  
})

function auth(req,res,next){
  const token = req.headers.token;
  const verifiedid = JWT.verify(token,JWT_SECRET);
if(verifiedid){
  req.userId=verifiedid.id;
  next();
}else{
  res.status(403).json({
    message:"Authentication failed"
  });
}
}

app.post("/todo",auth,async function(req,res){
  const userId= req.userId;
 const todo = req.body.todo;
 const done = req.body.done;


 if(todo){
   await TodoModel.create({
  userId: userId,
  todo:todo,
  done:done
 });
    res.json({
  message:`${todo} Added`
 });
 
  
 }else{
  res.json({
    message:'Enter Todo in Correct Format '
  }
  )
 }
  
  
})

app.post("/todos",auth,async function(req,res){
  const userId= req.userId;

  const todos = await TodoModel.find({userId});
  const todoslist = [];
  todos.forEach(user=>{
    const todo = {
      todo: user.todo,
      done:user.done
    }
    todoslist.push(todo);
  })
  res.json(todoslist);
  })
  


app.listen(3000);
