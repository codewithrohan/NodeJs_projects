
const User=require('../models/user_models')
const {setUser}=require('../service/auth')

// uuidv4();

async function HandleUserSignUp(req,res)
{
    //creating a new user in the database
    const {name,email,password}=req.body
    await User.create({
        name,
        email,
        password,
    })

    // Redirecting the user to the homepage after signup
    return res.redirect('/')        //brings to homepage directly after signup
}

async function HandleUserLogin(req,res)
{
    const {email,password}=req.body

    // Finding the user in the database based on the email and password
    const user=await User.findOne({email,password})
    if(!user)
    {
        return res.render('login',{
            error:"Invalid Username/Password"
        })
    }
    //Generating a token for the user
    const token = setUser(user);
    res.cookie('token',token)           
    return res.redirect('/')           
    // return res.json({token})
}

module.exports={
    HandleUserSignUp,
    HandleUserLogin
}