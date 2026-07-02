import express from "express";
import type {Application, Request, Response} from "express"
import ApiResponse from "./common/utils/api-response.js";


const app:Application = express()

app.use(express.json())

app.get("/health", (req: Request,res: Response)=>{
    ApiResponse.ok(res, "Typescript is working fine.")
})

export default app;



