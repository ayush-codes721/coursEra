import { Router } from "express";
import { AuthController } from "../controller/user/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";


const authRouter = Router();

authRouter.post('/signup-user', AuthController.signup);
authRouter.post('/signin-user', AuthController.signin);
authRouter.get('/profile',AuthMiddleware.isUserAuthenticated,AuthController.getProfile)



export { authRouter }