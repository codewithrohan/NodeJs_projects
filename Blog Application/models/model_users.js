
const { createHmac,randomBytes } = require('crypto');
const {Schema, model}=require('mongoose');
const {createTokenForUser}=require('../services/authentication.js')


//schema for user

const UserSchema=new Schema({
    
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String, 
    },
    password:{
        type:String,
        required:true,
    },
    profileImgUrl:{
        type:String,
        default:'/images/default.jpg',
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],            // it is like an array , here we cannot assign some other value other than these 2
        default:'USER'
    },

}, {timestamps:true})

UserSchema.pre('save',function (next){              // whenever user first sets his password first-time or updates it afterwards this function will hash the password respectively
    const user=this
    if(!user.isModified('password')) return

    const salt=randomBytes(16).toString()
    const hashedPassword=createHmac('sha256',salt)
    .update(user.password)
    .digest('hex')

    this.salt=salt                  // updating the object for salt and password with new salt value and hashedpassword
    this.password=hashedPassword    

    next()
})

UserSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user=await this.findOne({email})
    if(!user) throw new Error('User not found')
    // console.log(user) 
    const salt=user.salt
    const hashedPassword=user.password

    const userProvidedHash=createHmac('sha256',salt).update(password).digest('hex')             // password given during login is hashed here
    if(hashedPassword!==userProvidedHash)
        throw new Error('incorrect password')

    const token= createTokenForUser(user)
    return token
})
 
const User= model('user',UserSchema)

module.exports=User




