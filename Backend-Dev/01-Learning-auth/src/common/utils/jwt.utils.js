import crypto from "crypto";
import jwt from 'jsonwebtoken';


const generateResetToken = ()=>{
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex")

    return{rawToken, hashedToken}
}


const generateAccessToke = (payload)=>{
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m"
    } )
}


const verifyAccessToken = (token)=>{
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)
}

const generateRefreshToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d"
    })
}


const verifyRefreshToken = (token)=>{
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET)
}




export {generateResetToken, generateAccessToke, generateRefreshToken, verifyAccessToken, verifyRefreshToken}