import express from "express";
import type {Application, Request, Response} from "express"


const app:Application = express()

app.use(express.json())

app.get("/health", (req: Request,res: Response)=>{
    res.status(200).json({
        success:true,
        message:"Typescript server is working fine"
    })
})

export default app;



