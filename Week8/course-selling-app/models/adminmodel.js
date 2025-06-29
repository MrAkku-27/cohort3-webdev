const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema ({
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

})
const AdminModel = mongoose.model('Admin',Admin);
module.exports =AdminModel;