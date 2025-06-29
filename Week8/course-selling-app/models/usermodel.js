const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
  name: {
    type :String,
     minLength:4,
     required:true
    },
  email:{
    type:String, 
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  enrolledCourses:[{
    type:Schema.Types.ObjectId,
    ref:'Course',
  
  }]
})
const UserModel = mongoose.model('User',User);
module.exports =UserModel;