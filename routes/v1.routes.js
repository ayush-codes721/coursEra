import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { adminAuthRouter } from "./admin/auth.admin.routes.js";
import { adminCourseRouter } from "./admin/course.admin.routes.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";


const v1Router = Router();

//user routes
v1Router.use('/v1/auth',authRouter);

//admin routes
v1Router.use('/v1/admin/auth',adminAuthRouter) 
v1Router.use('/v1/admin/course',AuthMiddleware.isUserAuthenticated,AuthMiddleware.isAdminAuthenticated, adminCourseRouter)


export {v1Router}