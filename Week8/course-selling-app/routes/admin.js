const {Router} = require("express");
const adminRouter = Router();
const {signup}= require("../controller/signup.controller");
const AdminModel = require("../models/adminmodel");
const { signin } = require("../controller/signin.controller");
const CourseModel = require("../models/coursemodel");
require('dotenv').config();
const jwt = require('jsonwebtoken');



adminRouter.post("/signup",async function(req,res){
   const userdetails = await signup(req,res,AdminModel);
  console.log("Admindetails before saving:", userdetails);
  try{
  await AdminModel.create(userdetails);
  res.json({
    message:"signup successfull"
  })
  }catch(e){
    res.json({error:e.errorResponse.errmsg});
  }
})

adminRouter.post("/signin",async function(req,res){
   const {email} =req.body ;
  const userdetail = await AdminModel.findOne({email});
  if(userdetail){
  signin(req,res,process.env.JWT_ADMIN_SECRET,AdminModel);
  }else{
    res.json({
      message:"Admin not found"
    })
  }
  
  
})


adminRouter.get("/courses",async function(req,res){
  const courses = await CourseModel.find({});
if(courses.length>0){
    res.json(courses);
}else{
  res.json({
        message:"No course Found"
  });
  
}
});

adminRouter.post("/courses",async function(req,res){
  const {title,description,price}=req.body;
  const userdetails = jwt.verify(req.headers.token,process.env.JWT_ADMIN_SECRET);
  if(userdetails){
    const existingcourse = await CourseModel.findOne({title,description});
    if(!existingcourse){
     const creatorId = userdetails.id;
     const coursedetail = {
    title,
    description,
    price,
    creatorId
     }
    const createcourse = await CourseModel.create(coursedetail);
  if(createcourse){
    res.json({
      message:"Course Created"
    })
  }else{
    res.json({
      message:"Couses Creation failed"
    })
  }}else{
    res.json({
      message:"Course Already Exist"
    })
  }

  }else{
    res.json({
      message:'You need To be admin to Create course'
    })
  }
})

adminRouter.put("/courses/:courseid",async function(req,res){
  const {title,description,price}=req.body;
  const userdetails = jwt.verify(req.headers.token,process.env.JWT_ADMIN_SECRET);
  if(userdetails){
    const creatorId = userdetails.id;
  const courseid = req.params.courseid;
  const creatorcheck = await CourseModel.findOne({creatorId});
  if(creatorcheck){
  const updatedata = await CourseModel.findByIdAndUpdate(courseid,{
    title,
    description,
    price
  },{
    new:true,
    runValidators:true
  })
  if(updatedata){
    res.json({
      message:"Course Updated"
    })
  }else{
    res.json({
      message:"Updation failed"
    })
  }
  }else{
    res.json({
      message:"You Cannot Update this course"
    })
  }}
    else{
    res.json({
      message:"You need To be admin to Update course"
    })
  }
})

adminRouter.delete("/courses/:courseid",async function(req,res){
  const courseid = req.params.courseid;
 const userdetails = jwt.verify(req.headers.token,process.env.JWT_ADMIN_SECRET);
  if(userdetails){
  const deletedata = await CourseModel.findByIdAndDelete(courseid);
  if(deletedata){
    res.json({
      message:"Course Deleted"
    })
  }else{
    res.json({
      messsage:"Course Deletion Failed"
    })
  }}else{
    res.json({
      message:"You need To be admin to Delete course"
    })
  }
 
})



module.exports=adminRouter;