const JWT=require('jsonwebtoken')
const secretkey='R0#@n@307026'      // Secret key used for JWT

// this Below function is to create a JWT for a user
function createTokenForUser(user)
{
    const payload={
        _id:user._id,
        email:user.email,
        profileImgUrl:user.profileImgUrl,
        role:user.role,
    }
    const token=JWT.sign(payload,secretkey)     // Sign the payload with the secret key
    return token
}

// this function validates a JWT and return the payload
function validateToken(token)
    {
        const payload=JWT.verify(token,secretkey)
        return payload
    }

module.exports={
    createTokenForUser,validateToken,
} 