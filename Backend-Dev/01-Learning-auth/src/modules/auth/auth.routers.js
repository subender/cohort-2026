import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";

const router = Router()

router.post("/register", validate(RegisterDto))


export default router