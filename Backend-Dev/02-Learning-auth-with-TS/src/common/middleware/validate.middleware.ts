import {ZodType, ZodError} from "zod"
import type {ValidationErrorDetails} from "../utils/api-error.js"
import ApiError from "../utils/api-error.js";

import type { Request,Response,NextFunction } from "express";

const validate = <T extends ZodType> (schema: T) =>{
    return async (req:Request, res:Response, next: NextFunction)=>{
        try {
            req.body = await schema.parseAsync(req.body)
            next()
        } catch (error:unknown) {

            if(error instanceof ZodError){
                const zodErrors : ValidationErrorDetails[] = error.issues.map((iss)=>({
                    field: iss.path.join('.'),
                    message: iss.message
                }))

                return next(ApiError.badRequest("Validation Failed", zodErrors))
            }
            
        }
    }
}