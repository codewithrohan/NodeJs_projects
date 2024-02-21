const mongoose=require('mongoose')
const User = require('./user_models')

const UrlSchema=new mongoose.Schema({
    shortId:
    {
        type:String,
        require:true,
        unique:true,
    },
    redirectUrl:
    {
        type:String,
        require:true,
    },
    visitHistory:[{timeStamp:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"users",            // Referencing to the User model for the user who created the short URL
    }
    },

    {timestamps:true},
)

const URL=mongoose.model('URL',UrlSchema)

module.exports=URL
