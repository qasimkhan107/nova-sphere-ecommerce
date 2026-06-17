require('dotenv').config()
const jwt=require('jsonwebtoken')

exports.generateToken=(payload,passwordReset=false)=>{
    console.log("LOGIN_TOKEN_EXPIRATION =", process.env.LOGIN_TOKEN_EXPIRATION)
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:passwordReset?process.env.PASSWORD_RESET_TOKEN_EXPIRATION:process.env.LOGIN_TOKEN_EXPIRATION})
}