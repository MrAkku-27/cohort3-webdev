const express = require("express")
const app = express();
// const cors = require('cors')
app.use(express.json())
// app.use(cors());

app.get("/",function(req,res){
  res.sendFile(__dirname+"/httpdemo/index.html");
})

app.post("/add",function(req,res){   
const a = parseInt(req.body.a)
const b = parseInt(req.body.b)
  const ans=a+b;
 res.json({
  answer:ans
});
console.log(ans);

})


app.listen(3000)