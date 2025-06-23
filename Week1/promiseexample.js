const fs= require("fs");

function readTheFile(sendTheReadFile){
  fs.readFile("a.txt","utf-8",(err,data)=>{
    if(err){
      sendTheReadFile(err);
    }else 
    {
      sendTheReadFile(data);
    }
  })
}
function readFile(){
  return new promise (readTheFile);
}
const p = new readFile();

function callback(content){
  console.log(content);
}
p.then(callback());