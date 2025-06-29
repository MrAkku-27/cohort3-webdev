const {Router} = require("express");
const UserModel = require("../models/usermodel");
const CourseModel = require("../models/coursemodel");
const userRouter = Router();
require('dotenv').config();
const {signup}= require("../controller/signup.controller");
const { signin } = require("../controller/signin.controller");
const jwt = require('jsonwebtoken');


userRouter.post("/signup",async function(req,res){
  const userdetails = await signup(req,res,UserModel);
  console.log("Userdetails before saving:", userdetails);
  try{
  await UserModel.create(userdetails);
  res.json({
    message:"signup successfull"
  })
  }catch(e){
    res.json({error:e.errorResponse.errmsg});
  }

})

userRouter.post("/signin",async function(req,res){
  const {email,name} =req.body ;
  const userdetail = await UserModel.findOne({email,name});
  if(userdetail){
    signin(req,res,process.env.JWT_USER_SECRET,UserModel);
  }else{
    res.json({
      message:"User Not found"
    })
  }
})

userRouter.post("/purchase-course/:courseid",async function(req,res){
  const courseId =req.params.courseid;
  const userdetails = jwt.verify(req.headers.token,process.env.JWT_USER_SECRET);
  const userid = userdetails.id;
  const user = await UserModel.findById(userid);
  const course = await CourseModel.findById(courseId);
  if(course){
  const alreadyEnrolled = user.enrolledCourses.includes(courseId);
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }
    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Successfully enrolled in course" });
  }else{
    res.json({
      message:"Course Not Found"
    })
  }

  
})

userRouter.get("/courses",async function(req,res){
const courses = await CourseModel.find({});
if(courses.length>0){
    res.json(courses);
}else{
  res.json({
        message:"No course Found"
  });
}
})

userRouter.get("/purchased-course",async function(req,res){
  const userdetails = jwt.verify(req.headers.token,process.env.JWT_USER_SECRET);
  const userid = userdetails.id;
  const user = await UserModel.findById(userid).populate('enrolledCourses');
if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      enrolledCourses: user.enrolledCourses
    });

  
})

module.exports=userRouter;