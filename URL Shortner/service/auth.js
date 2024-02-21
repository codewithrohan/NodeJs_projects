
const jwt=require('jsonwebtoken')
const secret='Roh@123'


function setUser(user){                        // token assignment for user
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    }, secret)
}

function getUser(token) {
    if(!token) return null
    try {
        return jwt.verify(token,secret)
    } catch (error) {
        return null
    }
    
}

module.exports={
    setUser,getUser,
}



/// this whole file is just an diary which take the data of user and store its session id into it
// and whenenver user requests to this diary it provides the sessionid to it