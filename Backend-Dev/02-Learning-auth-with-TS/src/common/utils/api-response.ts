import type { Response } from "express";
import { success } from "zod";
class ApiResponse {
    
    static ok<T>(res:Response, message:string, data: T | null = null){
       return res.status(200).json({
            success:true,
            message:message,
            data
        })
    }

    static created<T>(res:Response, message:string, data: T | null = null){
        return res.status(201).json({
            success:true,
            message,
            data
        })
    }
}

export default ApiResponse;