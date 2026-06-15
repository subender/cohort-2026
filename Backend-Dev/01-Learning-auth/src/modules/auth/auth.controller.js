import * as authService from "./auth.service.js"
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res)=>{
    const user = await authService.register(req.body)

    ApiResponse.created(res, 'Registration Successful. Please verify your email.', user)
    
}



const login = async (req, res, next)=>{
    
    
    try {
        
 const {user, accessToken, refreshToken} = await authService.login(req.body)
 ApiResponse.ok(res, "Login Successful", user)
    } catch (error) {
        next(error)
    }

}
export {register, login}