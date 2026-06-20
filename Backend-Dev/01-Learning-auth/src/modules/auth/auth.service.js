import crypto from "crypto";
import  User from "../auth/auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { generateAccessToke, generateRefreshToken, generateResetToken, verifyAccessToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js"
import { sendVerificationEmail } from "../../common/config/mail.js";


const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const register = async ({name, email, password, role})=>{

    
    const existing = await User.findOne({email});
    
    if (existing) throw ApiError.conflict('Email already exists.');
    
    const {rawToken, hashedToken} = generateResetToken();

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })   

    const userObj = user.toObject();
    delete userObj.password
    delete userObj.verificationToken;


    try {
      await sendVerificationEmail(email,rawToken)
    } catch (error) {
      console.error("Failed to send verification email:", error.message)
    }

    return userObj;

}


const login = async ({email, password})=>{
    const user = await  User.findOne({email}).select("+password")

    if(!user) throw ApiError.unauthorized("Invalid email or password")
    
    const isMatch = await user.comparePassword(password);

    if(!isMatch) throw ApiError.unauthorized("Invalid email or password")

    if(!user.isVerified) throw ApiError.forbidden("Please verify your email before login")

    const accessToken = generateAccessToke({id: user._id, role: user.role})
    const refreshToken = generateRefreshToken({id: user._id})

    user.refreshToken = hashToken(refreshToken)
    await user.save({validateBeforeSave:false})

    const userObj = user.toObject();
    delete userObj.password
    delete userObj.refreshToken

    return {user:userObj, accessToken, refreshToken}

}


const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("Refresh token missing");

  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user) throw ApiError.unauthorized("User no longer exist");

  if (user.refreshToken !== hashToken(token)) {
    throw ApiError.unauthorized("Invalid refresh token. Please login again.");
  }

  const accessToken = generateAccessToke({ id: user._id, role: user.role });

  return { accessToken };
};


const logout = async (id)=>{
    await User.findByIdAndUpdate(id, {refreshToken: null})
}



export{
    register,
    login,
    refresh,
    logout
}