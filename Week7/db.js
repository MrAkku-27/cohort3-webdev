const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const ObjectId= Schema.ObjectId;

const User = new Schema({
  name:{
    type:String,
    required:true,
    minlength:4,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:8
  }
},{timestamps:true});

const Todo = new Schema({
  userId: ObjectId,
  todo:String,
  done:Boolean
},{timestamps:true});

const UserModel = mongoose.model('users',User);
const TodoModel = mongoose.model('todos',Todo)

module.exports ={
UserModel,
TodoModel
}