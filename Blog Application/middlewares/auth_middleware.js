const { validateToken } = require("../services/authentication")

// Middleware function to check for authentication cookie
function checkForAuthenticationCookie(cookieName)
{
    return(req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName]  // this will get us specified cookie
        if(!tokenCookieValue){
           return next()
        }
        
        try {
            
            const userpayload=validateToken(tokenCookieValue)
            req.user=userpayload             // Set req.user to the decoded user payload
            
        } catch (error){
            console.error(error)
        }
        return next()       //move to next middleware
    }   
}

module.exports={
    checkForAuthenticationCookie,
}










