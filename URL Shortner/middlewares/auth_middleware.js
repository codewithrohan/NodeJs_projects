const {getUser}=require('../service/auth')          // to check if user is present or not 


function checkForAuthentication(req,res,next)
{
    const tokenCookie=req.cookies?.token
    req.user=null

    if(!tokenCookie)
    {
        return next()
    }

    const token=tokenCookie
    const user=getUser(token)

    req.user=user
    return next()
}



function restrictTo(roles=[])           // this particular function tells to whom we have to restrict
{
    return function(req,res,next)
    {
        if(!req.user) res.redirect('/login')

        if( !roles.includes(req.user.role)) return res.end('UnAuthorized')

        return next()
    }
}


module.exports={

    checkForAuthentication,restrictTo,
}

