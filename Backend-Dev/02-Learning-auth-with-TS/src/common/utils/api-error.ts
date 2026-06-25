export interface ValidationErrorDetails  {
    field: string,
    message: string
}   

class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public errors: ValidationErrorDetails[];

    constructor(statusCode: number, message: string, errors: ValidationErrorDetails[]=[]){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.errors = errors

        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest = (message: string = "Bad Request", errors: ValidationErrorDetails[] = [])=>{
        new ApiError(400, message, errors)
    }

    static unauthorized = (message: string = "Unauthorized", errors: ValidationErrorDetails[]=[])=>{
        new ApiError(401, message, errors)
    }

    static notfound = (message: string = "Not Found", errors: ValidationErrorDetails[]=[])=>{
        new ApiError(404, message, errors)
    }

}

export default ApiError