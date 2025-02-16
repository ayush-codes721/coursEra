import { Router } from "express";
import { upldaod } from "../../config/multer.js";
import { LessonController } from "../../controller/admin/lesson.controller.js";



const adminLessonRouter = Router();

adminLessonRouter.post('/create-lesson',upldaod.single('lesson'),LessonController.addlesson)

export {adminLessonRouter}