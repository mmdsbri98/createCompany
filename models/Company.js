const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Company=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
     number:{
        type:Number,
        required:true,
        unique:true
     },
     dateStablish:{
        type:Date,
        required:true,
        default:Date.now
     },
     phone:{
        type:Number,
        required:true,
        unique:true
     }
})

module.exports=mongoose.model('Company',Company)
