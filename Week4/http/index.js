const express = require('express')
const app= express()
function agecheck(age){
if(age>=14){
  return true
}else{
  return false
}
}

app.get('/ride1',function(req,res){
if (agecheck(req.query.age)){
res.json({
  msg:"Ride One Completed Succesfully"
})
}else{
  res.status(411).json({
    msg:"you are under aged"
  })
}


})

app.get('/ride2',function(req,res){
if (agecheck(req.query.age)){
res.json({
  msg:"Ride Two Completed Succesfully"
})
}else{
  res.status(411).json({
    msg:"you are under aged"
  })
}


})

app.listen(3000);