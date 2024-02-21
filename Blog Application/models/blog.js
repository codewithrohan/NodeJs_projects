const {Schema, model}=require('mongoose');

// schema for the blog model
const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user' // Reference to the User model for the creator of the blog
    },
},
{timestamps:true}) // Add timestamps for createdAt and updatedAt fields

const Blog=model('Blog',blogSchema)

module.exports=Blog
