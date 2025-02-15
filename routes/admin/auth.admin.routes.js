import { Router } from "express";
import { AuthController } from "../../controller/user/auth.controller.js";


const adminAuthRouter = Router();

adminAuthRouter.post('/signup-admin',AuthController.adminSignup);

export{adminAuthRouter}