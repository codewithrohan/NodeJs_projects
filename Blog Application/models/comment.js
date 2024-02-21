const {Schema, model}=require('mongoose');

// schema for comments
const commentSchema=new Schema(
    {
    
    content:{
        type:String, 
        required:true,
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:'blog',     // Reference to the Blog model for the associated blog post
    },   
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user',   // Reference to the User model for the creator of the comment
    },
}, {timestamps:true})       // Add timestamps for createdAt and updatedAt fields

const Comment=model('comment',commentSchema)
module.exports=Comment