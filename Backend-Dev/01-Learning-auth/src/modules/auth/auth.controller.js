import * as authService from "./auth.service.js"
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res)=>{
    const user = await authService.register(req.body)

    ApiResponse.created(res, 'Registration Successful. Please verify your email.', user)
    
}



const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    ApiResponse.ok(res, "Login Successful", user);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res) =>{
    const token = req.cookies?.refreshToken
    const {accessToken} = await authService.refresh(token);

    ApiResponse.ok(res, "Token refreshed", {accessToken})

}

export {register, login, refreshToken}