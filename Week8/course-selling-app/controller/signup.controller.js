const zoduser = require("../config/zod");
const bcrypt =require('bcrypt');
async function signup(req,res,Model){
  const conditioncheck = zoduser.safeParse(req.body);
  const {name,email,password}=req.body;
   
  const existinguser= await Model.findOne({email});
if(!existinguser){
  if(conditioncheck.success){
    const hashedpassword = await bcrypt.hash(password,5);
    const userdetail ={
      name,
      email,
      password:hashedpassword
    };
    return userdetail; 
  }else{
    res.json(conditioncheck.error.issues.map(x=> x.message));
  }
}else{
  res.json({
    message:"User Already Exists"
  })
}
}
module.exports = {
  signup,
  
}