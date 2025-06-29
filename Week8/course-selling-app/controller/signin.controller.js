const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
async function signin(req,res,secret_password,Model){
  const {name,email,password} = req.body;
  const userdetail = await  Model.findOne({email});
  const passwordcheck =await bcrypt.compare(password,userdetail.password);
  if(passwordcheck){
    const token = jwt.sign({
      id:userdetail._id
    },secret_password);
    res.json({
      token,
    })
  }else{
    res.json({
      message:"Invalid Credentials"
    });
  }
}

module.exports={
  signin,
}