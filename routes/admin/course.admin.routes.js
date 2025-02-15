import { Router } from "express";
import { CourseAdminController } from "../../controller/admin/course.controller.js";
import { upldaod } from "../../config/multer.js";


const adminCourseRouter = Router();
adminCourseRouter.post('/create-course',
    upldaod.single('thumbnail'),
    CourseAdminController.createCourse,

);

export {adminCourseRouter}