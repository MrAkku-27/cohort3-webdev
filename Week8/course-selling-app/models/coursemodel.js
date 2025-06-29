const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema ({
  title:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    default:''
  },
  price:{
    type:Number,
    min:0,
    required:true
  },
  creatorId:{
    type:Schema.Types.ObjectId,
    ref:'Admin'
  }
})
const CourseModel = mongoose.model('Course',Course);
module.exports =CourseModel;