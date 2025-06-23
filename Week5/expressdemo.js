const express = require("express")
const app = express();

// input -http://localhost:3000/add/10/10
app.get("/add/:a/:b",function(req,res){     //=> it uses params
 const a= parseInt(req.params.a);
 const b= parseInt(req.params.b);
 const ans=a+b;
 res.send(ans);
})

// input - http://localhost:3000/sub?a=10&b=2
app.get("/sub",function(req,res){           //=> it uses query
 const a= parseInt(req.query.a);
 const b= parseInt(req.query.b);
 const ans=a-b;
 res.send(ans);
})

app.get("/mul",function(req,res){
 const a= parseInt(req.query.a);
 const b= parseInt(req.query.b);
 const ans=a*b;
 res.send(ans);
})

app.get("/div",function(req,res){
  const a= parseInt(req.query.a);
 const b= parseInt(req.query.b);
 const ans=a/b;
 res.send(ans);
})
app.listen(3000)