const express = require('express')
const app= express()
function agecheckMiddleware(req,res,next){
if(req.query.age>=14){
  next()
}else{
  res.status(411).json({
    msg:"you are under aged"
  })
}
}
app.use(agecheckMiddleware);
app.get('/ride1',function(req,res){

res.json({
  msg:"Ride One Completed Succesfully"
})
})

app.get('/ride2',function(req,res){

res.json({
  msg:"Ride Two Completed Succesfully"
})

})

app.listen(3000);