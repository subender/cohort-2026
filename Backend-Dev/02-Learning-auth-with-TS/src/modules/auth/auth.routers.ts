import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import registerSchema, {type RegisterSchema} from "./dto/register.dto.js";


const router = Router();

router.post("/register", validate(registerSchema) )