const mongoose=require('mongoose')

//user schema 
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL",               // Role defaults to "NORMAL" if not provided   //check in index at line-28 
    },
    password:{
        type:String,
        required:true,
    }
},
{timestamps:true} 
)

const User=mongoose.model('user',userSchema)

module.exports=User